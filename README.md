<div align="center">

[![Icon](./icons/Hi-Res%20Redirector.svg)][Install]

</div>

<div align="center" style="padding: 2vh 10vw 1vh 10vw; display: flex; flex-basis: auto; flex-wrap: wrap; flex-shrink: 1; flex-flow: row wrap; float: inline-flex; justify-content: space-around; justify-items: center;">

[![Release](https://img.shields.io/github/v/release/kjanat/Hi-Res-Redirector?display_name=tag&style=for-the-badge&logo=github)][Latest Release]
[![License](https://img.shields.io/github/license/kjanat/hi-res-redirector?style=for-the-badge)][License]
[![Commits](https://img.shields.io/github/commit-activity/m/kjanat/Hi-Res-Redirector?label=commits&style=for-the-badge)][Commit History]
[![Last commit](https://img.shields.io/github/last-commit/kjanat/Hi-Res-Redirector?style=for-the-badge&display_timestamp=committer)][Last activity]

[![Store Version](https://img.shields.io/chrome-web-store/v/dhbcbfobeiomanfcigonldkgpaelffmb?style=for-the-badge&logo=chromewebstore&logoColor=white)][Chrome Web Store]
[![Store Size](https://img.shields.io/chrome-web-store/size/dhbcbfobeiomanfcigonldkgpaelffmb?style=for-the-badge&label=size)][Chrome Web Store]
[![Store Users](https://img.shields.io/chrome-web-store/users/dhbcbfobeiomanfcigonldkgpaelffmb?style=for-the-badge&color=4285F4&link=https%3A%2F%2Fchromewebstore.google.com%2Fdetail%2Fdhbcbfobeiomanfcigonldkgpaelffmb)][Chrome Web Store]
[![Store Status](https://img.shields.io/website?url=https%3A%2F%2Fchromewebstore.google.com%2Fdetail%2Fdhbcbfobeiomanfcigonldkgpaelffmb&up_message=available&down_message=unavailable&style=for-the-badge&label=)][Chrome Web Store]
[![Store Rating](https://img.shields.io/chrome-web-store/rating/dhbcbfobeiomanfcigonldkgpaelffmb?style=for-the-badge&link=https%3A%2F%2Fchromewebstore.google.com%2Fdetail%2Fdhbcbfobeiomanfcigonldkgpaelffmb)][Chrome Web Store]

[![Supported Sites](https://img.shields.io/badge/-Supported_Sites-brightgreen.svg?style=for-the-badge)][Supported Sites]

</div>

<div align="center">

# Hi-Res Redirector

</div>

The Hi-Res Redirector is a browser extension designed to enhance your online visual experience by
automatically redirecting you to higher quality or alternative versions of images on several popular websites.
Whether you're shopping, news browsing, or video watching,
this extension ensures you get the best image quality available.

## Features

- **Amazon**: Auto-redirects Amazon images to their highest resolution counterparts.
- **Adidas**: Ensures you're viewing the crispest product images from Adidas.
- **eBay**: Redirects to high-definition eBay product photos, eliminating blurry item images.
- **BBC**: Enjoy crystal clear visuals when browsing BBC images.
- **More Supported Sites**: Includes support for Marktplaats, Nike, YouTube, AliExpress, and Google User Content, enhancing images across these platforms.
- **Customizable Settings**: Enable or disable redirects for specific websites to tailor the extension to your preferences.
- **Debug Mode**: Get visual notifications when redirects happen (useful for developers and curious users).
- **Performance Optimized**: Lightweight code that won't slow down your browsing experience.

## How It Works

Once activated, the extension monitors the URLs you visit. When it detects you're on one of the supported websites,
it works in the background to modify the image URLs.
If a higher quality or more direct version of the image is found,
it seamlessly redirects you to that image, ensuring optimal image quality without any additional effort.

## Usage Examples

### Amazon Images
- **Before**: `https://m.media-amazon.com/images/I/71cJLMtNmQL._AC_SL1500_.jpg`
- **After**: `https://m.media-amazon.com/images/I/71cJLMtNmQL.jpg`

### YouTube Thumbnails
- **Before**: `https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg`
- **After**: `https://i.ytimg.com/vi_webp/dQw4w9WgXcQ/maxresdefault.webp`

### BBC Images
- **Before**: `https://ichef.bbci.co.uk/images/ic/400x225/p0gq0v7y.jpg`
- **After**: `https://ichef.bbci.co.uk/images/ic/1920x1080/p0gq0v7y.jpg`

## Configuration Options

Hi-Res Redirector now includes a settings page where you can customize its behavior:

1. **Site-Specific Toggles**: Enable or disable redirects for individual sites.
2. **Debug Mode**: Enable visual notifications and console logging for troubleshooting.

To access the options page:
- Right-click on the extension icon in your browser toolbar
- Select "Options" from the dropdown menu

## Install

### Get it from the Chrome Web Store

To install the Hi-Res Redirector browser extension, simply visit the [Chrome Web Store][Chrome Web Store] and click on the "Add to Chrome" button.
Once installed, the extension will be ready to enhance your online visual experience
by automatically redirecting you to higher quality or alternative versions of images on supported websites.

### Manual Installation Instructions

If you prefer to manually install the Hi-Res Redirector browser extension, follow these steps:

1. Download the extension files from the [GitHub repository][Latest Release].
2. Extract the downloaded ZIP file to a location on your computer.
3. Open your browser and go to the extensions management page. For Chrome, you can access it by typing `chrome://extensions` in the address bar.
4. Enable the "Developer mode" toggle switch, usually located at the top right corner of the page.
5. Click on the "Load unpacked" button and select the folder where you extracted the extension files.
6. The Hi-Res Redirector extension should now be installed and ready to use.

> [!CAUTION]
> Manually installed extensions will not receive automatic updates.
> You will need to manually update the extension by repeating
> these steps whenever a new version is available.

### Install for Organization in Google Admin

If you want to deploy the Hi-Res Redirector browser extension to your organization using Google Admin, follow these steps:

1. Sign in to your Google Admin console.
2. Go to **Devices** > **Chrome management** > **Apps & extensions**.
3. Click on **Add**.
4. In the search bar, enter the extension ID: `dhbcbfobeiomanfcigonldkgpaelffmb`.
5. Click on the extension from the search results.
6. Configure the installation settings according to your organization's requirements.
7. Click on **Save** to deploy the extension to your organization's devices.

Once deployed, the Hi-Res Redirector extension will be automatically installed on the devices within your organization, providing enhanced image quality and redirection capabilities.

> [!NOTE]
> Deploying extensions through Google Admin requires administrative privileges
> and may vary depending on your organization's settings and policies.

## For Developers

### Project Structure
- `manifest.json`: Extension configuration 
- `content.js`: Core functionality with site-specific image processors
- `options.html` & `options.js`: Settings UI and functionality
- `icons/`: Extension icons in various sizes

### Contributing
Contributions are welcome! Here's how you can help:
1. **Add Support for More Sites**: Implement new image processors in `content.js`
2. **Improve Existing Redirectors**: Enhance regex patterns for better accuracy
3. **Report Bugs**: Submit issues for any problems you encounter
4. **Suggest Features**: Have an idea? Open a feature request!

### Development Setup
1. Clone the repository
2. Make your changes
3. Test locally using Chrome's "Load unpacked" feature
4. Submit a pull request with your improvements

## Privacy

The Hi-Res Redirector does not store, transmit, or sell your data. It operates solely within your browser, ensuring your privacy is protected.

## Changelog

### v0.2.0
- Added options page for customizing site-specific redirects
- Implemented debug mode with visual notifications
- Refactored code for better maintainability
- Added performance monitoring in debug mode
- Improved error handling

### v0.1.0
- Initial public release
- Support for Amazon, eBay, BBC, Adidas, Nike, Marktplaats, YouTube, AliExpress, and Google images

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

[Install]: #install
[Latest Release]: https://github.com/kjanat/Hi-Res-Redirector/releases/latest "Latest release"
[Chrome Web Store]: https://chromewebstore.google.com/detail/dhbcbfobeiomanfcigonldkgpaelffmb "Chrome Web Store"
[Supported Sites]: manifest.json#L15-L30 "Supported Sites"
[License]: LICENSE "License"
[Commit History]: https://github.com/kjanat/Hi-Res-Redirector/commits "Commit History"
[Last activity]: https://github.com/kjanat/Hi-Res-Redirector/pulse/monthly "Last activity"
