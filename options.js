// Default settings
const defaultSettings = {
    enabledSites: {
        amazon: true,
        ebay: true,
        bbc: true,
        adidas: true,
        nike: true,
        marktplaats: true,
        youtube: true,
        aliexpress: true,
        google: true
    },
    debugMode: false
};

// Load saved settings when the options page opens
document.addEventListener('DOMContentLoaded', function() {
    restoreOptions();
    
    // Set up the form submit handler
    document.getElementById('options-form').addEventListener('submit', saveOptions);
});

// Save user's settings to chrome.storage
function saveOptions(e) {
    e.preventDefault();
    
    // Gather settings from form
    const enabledSites = {};
    document.querySelectorAll('.site-toggle').forEach(checkbox => {
        if (checkbox.id === 'debug-mode') return; // Skip debug mode, handled separately
        enabledSites[checkbox.id] = checkbox.checked;
    });
    
    // Get debug mode setting
    const debugMode = document.getElementById('debug-mode').checked;
    
    // Save to chrome.storage
    chrome.storage.sync.set({
        enabledSites: enabledSites,
        debugMode: debugMode
    }, function() {
        // Update status to let user know options were saved
        const status = document.getElementById('status');
        status.textContent = 'Settings saved successfully!';
        
        // Clear the status after a short delay
        setTimeout(function() {
            status.textContent = '';
        }, 1500);
    });
}

// Restore saved settings from chrome.storage
function restoreOptions() {
    chrome.storage.sync.get(defaultSettings, function(items) {
        // Set site checkboxes based on saved settings
        for (const [site, enabled] of Object.entries(items.enabledSites)) {
            const checkbox = document.getElementById(site);
            if (checkbox) checkbox.checked = enabled;
        }
        
        // Set debug mode checkbox
        document.getElementById('debug-mode').checked = items.debugMode;
    });
}
