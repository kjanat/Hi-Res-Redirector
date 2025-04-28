// Initialize DEBUG based on stored settings
let DEBUG = false;
const perfStart = performance.now();

function log(...args) {
    if (DEBUG) {
        console.log('[Hi-Res Redirector]', ...args);
    }
}

const currentUrl = window.location.href;
let newUrl = currentUrl;
let redirected = false;

// Helper function to check if image exists
async function checkImageAvailability(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok ? url : null;
    } catch (error) {
        console.error('[Hi-Res Redirector] Error:', error);
        return null;
    }
}

// Site-specific processors
function processAmazonImage(url) {
    log('Processing Amazon URL:', url);
    let processedUrl = url;
    
    if (url.includes('m.media-amazon.com')) {
        processedUrl = url.replace(/(https:\/\/m\.media-amazon\.com\/images\/I\/[^\.]+)\..*\.jpg$/, "$1.jpg");
    } else if (url.includes('ssl-images-amazon.com')) {
        processedUrl = url.replace(/(https:\/\/.*ssl-images-amazon\.com\/images\/I\/[^\.]+)\..*\.jpg$/, "$1.jpg");
    }
    
    return processedUrl;
}

function processAdidasImage(url) {
    log('Processing Adidas URL:', url);
    if (url.includes('assets.adidas.com')) {
        return url.replace(/https:\/\/assets\.adidas\.com\/images\/(?:[^\/]+\/)+([^\/]+\/[^\/]+)$/, "https://assets.adidas.com/images/$1");
    }
    return url;
}

function processEbayImage(url) {
    log('Processing eBay URL:', url);
    if (url.includes('i.ebayimg.com')) {
        return url.replace(/https:\/\/i\.ebayimg\.com\/(?:thumbs\/)?images\/g\/([^\/]+)\/s-l\d+.(?:webp|png|jpg)$/, "https://i.ebayimg.com/images/g/$1/s-l2000.png");
    }
    return url;
}

function processBBCImage(url) {
    log('Processing BBC URL:', url);
    if (url.includes('ichef.bbci.co.uk')) {
        return url.replace(/(https:\/\/ichef\.bbci\.co\.uk\/images\/ic)\/\d+x\d+\//, "$1/1920x1080/");
    }
    return url;
}

function processMarktplaatsImage(url) {
    log('Processing Marktplaats URL:', url);
    let processedUrl = url;
    
    if (url.includes('images.marktplaats.com')) {
        processedUrl = url.replace(/\$_\d+$/, "$_86");
    } else if (url.includes('mp.images.icas.io')) {
        processedUrl = url.replace(/\?rule=eps_\d+\.JPG$/, "?rule=eps_86.JPG");
    }
    
    return processedUrl;
}

function processNikeImage(url) {
    log('Processing Nike URL:', url);
    if (url.includes('static.nike.com')) {
        return url.replace(/https:\/\/static\.nike\.com\/a\/images\/(?:[^\/]+\/)+([^\/]+\/[^\/]+)$/, "https://static.nike.com/a/images/$1");
    }
    return url;
}

function processYouTubeAvatar(url) {
    log('Processing YouTube Avatar URL:', url);
    if (url.includes('yt3.ggpht.com')) {
        return url.replace(/(https:\/\/yt3\.ggpht\.com\/(?:[a-zA-Z0-9\-_]+|ytc\/[a-zA-Z0-9\-_]+))(=s\d+-c-k-c0x00ffffff-no-rj)?$/, "$1");
    }
    return url;
}

async function processYouTubeThumbnail(url) {
    log('Processing YouTube Thumbnail URL:', url);
    if ((url.includes('i.ytimg.com/vi') || url.includes('img.youtube.com/vi')) && !redirected) {
        const regexPattern = /https:\/\/(?:i\.ytimg\.com|img\.youtube\.com)\/vi\/([a-zA-Z0-9\-_]+)\/([0-3]|default|mq[0-9]*|hq[0-9]*|sd[0-9]*|hqdefault|mqdefault|sddefault|maxresdefault|hq720|oar[0-9]*|hq720_[0-9]+)(?:\.jpg|\.webp).*$/;

        let match = url.match(regexPattern);
        if (match) {
            let videoId = match[1];
            let imageType = match[2];
            let base = "https://i.ytimg.com/vi_webp/" + videoId + "/";

            if (imageType.startsWith("oar")) {
                return base + imageType + ".webp";
            } else {
                const suffix = imageType.match(/_(\d+)/) ? imageType.match(/_(\d+)/)[0] : '';

                // List fallbacks from the highest resolution to the lowest
                const fallbacks = [
                    "maxresdefault" + suffix,
                    "hq720" + suffix,
                    "sddefault" + suffix,
                    "hqdefault" + suffix,
                    "mqdefault" + suffix,
                    "0",
                    "default" + suffix,
                    "sd1", "sd2", "sd3",
                    "hq1", "hq2", "hq3",
                    "mq1", "mq2", "mq3",
                    "1", "2", "3"
                ];

                // Try URLs in order until one works
                for (let i = 0; i < fallbacks.length; i++) {
                    const potentialUrl = base + fallbacks[i] + ".webp";
                    const urlAvailable = await checkImageAvailability(potentialUrl);
                    if (urlAvailable) {
                        return potentialUrl;
                    }
                }
            }
        }
    }
    return url;
}

function processAliExpressImage(url) {
    log('Processing AliExpress URL:', url);
    if (url.includes('alicdn.com/kf')) {
        return url.replace(/(https:\/\/ae\d{2}\.alicdn\.com\/kf\/[a-zA-Z0-9\-]+)(?:\/[^\.]+)?\.(jpg|jpeg|png|webp)(?:_.+)?(?:\.webp)?$/, "$1.$2");
    }
    return url;
}

function processGoogleImage(url) {
    log('Processing Google URL:', url);
    let processedUrl = url;
    
    if (url.includes('photos.fife.usercontent.google.com')) {
        processedUrl = url.replace(/=w\d+-h\d+-no-iv\d+/i, "=s0");
    } else if (url.includes('.googleusercontent.com')) {
        processedUrl = url.replace(/=s\d+.*/i, "=s0");
    }
    
    return processedUrl;
}

// Get enabled sites from storage or use defaults
let enabledSites = {
    amazon: true,
    adidas: true,
    ebay: true,
    bbc: true,
    marktplaats: true,
    nike: true,
    youtube: true,
    aliexpress: true,
    google: true
};

// Main processing function
async function processUrl() {
    try {
        // Get configuration first if storage permission is available
        if (chrome.storage && chrome.storage.sync) {
            try {
                const result = await new Promise(resolve => {
                    chrome.storage.sync.get({
                        enabledSites,
                        debugMode: false
                    }, items => resolve(items));
                });
                enabledSites = result.enabledSites;
                DEBUG = result.debugMode;
                log('Loaded configuration:', { enabledSites, debugMode: DEBUG });
            } catch (error) {
                console.error('[Hi-Res Redirector] Failed to load settings:', error);
                // Continue with defaults
            }
        }
        
        // Apply site-specific processors based on configuration
        if (enabledSites.amazon) newUrl = processAmazonImage(currentUrl);
        if (newUrl === currentUrl && enabledSites.adidas) newUrl = processAdidasImage(currentUrl);
        if (newUrl === currentUrl && enabledSites.ebay) newUrl = processEbayImage(currentUrl);
        if (newUrl === currentUrl && enabledSites.bbc) newUrl = processBBCImage(currentUrl);
        if (newUrl === currentUrl && enabledSites.marktplaats) newUrl = processMarktplaatsImage(currentUrl);
        if (newUrl === currentUrl && enabledSites.nike) newUrl = processNikeImage(currentUrl);
        if (newUrl === currentUrl && enabledSites.youtube) newUrl = processYouTubeAvatar(currentUrl);
        if (newUrl === currentUrl && enabledSites.youtube) newUrl = await processYouTubeThumbnail(currentUrl);
        if (newUrl === currentUrl && enabledSites.aliexpress) newUrl = processAliExpressImage(currentUrl);
        if (newUrl === currentUrl && enabledSites.google) newUrl = processGoogleImage(currentUrl);

        // Check if we need to redirect
        if (currentUrl !== newUrl && !redirected) {
            redirected = true;
            log('Redirecting to:', newUrl);
            
            // Show notification if enabled
            if (DEBUG) {
                showRedirectNotification();
            }
            
            window.location.href = newUrl;
        }

        if (DEBUG) {
            const perfEnd = performance.now();
            log(`URL processing took ${perfEnd - perfStart}ms`);
        }
    } catch (error) {
        console.error('[Hi-Res Redirector] Error in main process:', error);
    }
}

// Creates a visual notification when redirecting
function showRedirectNotification() {
    // Wait for body to be available
    if (document.body) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background-color: rgba(0, 128, 0, 0.8);
            color: white;
            padding: 10px;
            border-radius: 5px;
            z-index: 10000;
            font-family: Arial, sans-serif;
            font-size: 14px;
            transition: opacity 0.5s;
        `;
        notification.textContent = 'Redirected to high-resolution image';
        document.body.appendChild(notification);
        
        // Remove the notification after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }
}

// Execute the main process
processUrl();
