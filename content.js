const currentUrl = window.location.href;
let newUrl = currentUrl;
let redirected = false;

// Helper function to check if image exists
async function checkImageAvailability(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok ? url : null;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// For Amazon
if (currentUrl.includes('m.media-amazon.com')) {
    newUrl = currentUrl.replace(/(https:\/\/m\.media-amazon\.com\/images\/I\/[^\.]+)\..*\.jpg$/, "$1.jpg");
}
if (currentUrl.includes('ssl-images-amazon.com')) {
    newUrl = currentUrl.replace(/(https:\/\/.*ssl-images-amazon\.com\/images\/I\/[^\.]+)\..*\.jpg$/, "$1.jpg");
}

// For adidas
if (currentUrl.includes('assets.adidas.com')) {
    newUrl = currentUrl.replace(/https:\/\/assets\.adidas\.com\/images\/(?:[^\/]+\/)+([^\/]+\/[^\/]+)$/, "https://assets.adidas.com/images/$1");
}

// For eBay
if (currentUrl.includes('i.ebayimg.com')) {
    newUrl = currentUrl.replace(/https:\/\/i\.ebayimg\.com\/(?:thumbs\/)?images\/g\/([^\/]+)\/s-l\d+.(?:webp|png|jpg)$/, "https://i.ebayimg.com/images/g/$1/s-l2000.png");
}

// For BBC
if (currentUrl.includes('ichef.bbci.co.uk')) {
    newUrl = currentUrl.replace(/(https:\/\/ichef\.bbci\.co\.uk\/images\/ic)\/\d+x\d+\//, "$1/1920x1080/");
}

// For Marktplaats AND For Marktplaats CDN
if (currentUrl.includes('images.marktplaats.com')) {
    newUrl = currentUrl.replace(/\$_\d+$/, "$_86");
}
if (currentUrl.includes('mp.images.icas.io')) {
    newUrl = currentUrl.replace(/\?rule=eps_\d+\.JPG$/, "?rule=eps_86.JPG");
}

// For Nike
if (currentUrl.includes('static.nike.com')) {
    newUrl = currentUrl.replace(/https:\/\/static\.nike\.com\/a\/images\/(?:[^\/]+\/)+([^\/]+\/[^\/]+)$/, "https://static.nike.com/a/images/$1");
}

// For YouTube avatars
if (currentUrl.includes('yt3.ggpht.com')) {
    newUrl = currentUrl.replace(/(https:\/\/yt3\.ggpht\.com\/(?:[a-zA-Z0-9\-_]+|ytc\/[a-zA-Z0-9\-_]+))(=s\d+-c-k-c0x00ffffff-no-rj)?$/, "$1");
}

// For YouTube video thumbnails
if ((currentUrl.includes('i.ytimg.com/vi') || currentUrl.includes('img.youtube.com/vi')) && !redirected) {
    const regexPattern = /https:\/\/(?:i\.ytimg\.com|img\.youtube\.com)\/vi\/([a-zA-Z0-9\-_]+)\/([0-3]|default|mq[0-9]*|hq[0-9]*|sd[0-9]*|hqdefault|mqdefault|sddefault|maxresdefault|hq720|oar[0-9]*|hq720_[0-9]+)(?:\.jpg|\.webp).*$/;

    let match = currentUrl.match(regexPattern);
    if (match) {
        let videoId = match[1];
        let imageType = match[2];
        let base = "https://i.ytimg.com/vi_webp/" + videoId + "/";

        if (imageType.startsWith("oar")) {
            newUrl = base + imageType + ".webp";
            window.location.href = newUrl;
            redirected = true;
        } else {
            const suffix = imageType.match(/_(\d+)/) ? imageType.match(/_(\d+)/)[0] : ''; // To capture the custom patterns like _1, _2, etc.

            // List fallbacks from the highest resolution to the lowest
            const fallbacks = [
                "maxresdefault" + suffix, // 1920x1080 Maximum resolution thumbnail
                "hq720" + suffix, // 1280x720 High quality 720p thumbnail
                "sddefault" + suffix, // 640x480 Standard definition thumbnail
                "hqdefault" + suffix, // 480x360 High quality thumbnail
                "mqdefault" + suffix, // 320x180 Medium quality thumbnail
                "0", // 480x360 Player Background Thumbnail
                "default" + suffix, // 120x90 Default thumbnail image
                "sd1", // 640x480 Standard definition Video frame Start
                "sd2", // 640x480 Standard definition Video frame Middle
                "sd3", // 640x480 Standard definition Video frame End
                "hq1", // 480x360 High quality Video frame Start
                "hq2", // 480x360 High quality Video frame Middle
                "hq3", // 480x360 High quality Video frame End
                "mq1", // 320x180 Medium quality Video frame Start
                "mq2", // 320x180 Medium quality Video frame Middle
                "mq3", // 320x180 Medium quality Video frame End
                "1", // 120x90 Video frame Start
                "2", // 120x90 Video frame Middle
                "3" // 120x90 Video frame End
                //"oar1", // 405x720 Shorts Video frame Start
                //"oar2", // 405x720 Shorts Video frame Middle
                //"oar3", // 405x720 Shorts Video frame End
            ];

            // Function to try next URL
            async function tryNextUrl(index) {
                if (index >= fallbacks.length) return; // if no more fallbacks available

                const potentialUrl = base + fallbacks[index] + ".webp";
                const urlAvailable = await checkImageAvailability(potentialUrl);
                if (urlAvailable) {
                    redirected = true;
                    window.location.href = potentialUrl;
                } else {
                    tryNextUrl(index + 1);
                }
            }

            tryNextUrl(0); // start with the first fallback
        }
    }
}

// For AliExpress
if (currentUrl.includes('alicdn.com/kf')) {
    newUrl = currentUrl.replace(/(https:\/\/ae\d{2}\.alicdn\.com\/kf\/[a-zA-Z0-9\-]+)(?:\/[^\.]+)?\.(jpg|jpeg|png|webp)(?:_.+)?(?:\.webp)?$/, "$1.$2");
}

// For Google Photos and UserContent
if (currentUrl.includes('photos.fife.usercontent.google.com')) {
    newUrl = currentUrl.replace(/=w\d+-h\d+-no-iv\d+/i, "=s0");
}

// For Google User Content
// if (currentUrl.includes('lh3.googleusercontent.com')) {
// newUrl = currentUrl.replace(/=s\d+-w\d+-h\d+/i, "=s0");
// }

if (currentUrl.includes('.googleusercontent.com')) {
    newUrl = currentUrl.replace(/=s\d+.*/i, "=s0");
}

// Now also check if we're not currently checking any image
if (currentUrl !== newUrl && !redirected) {
    redirected = true;
    window.location.href = newUrl;
}