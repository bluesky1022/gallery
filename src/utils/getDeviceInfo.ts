interface IDeviceInfo {
    browser_name: string;
    browser_version: string;
}

export const getDeviceInfo = (): IDeviceInfo => {
    const userAgent = navigator.userAgent;
    let browser_name, browser_version;

    // Detect browser name and version
    if (userAgent.indexOf("Firefox") > -1) {
        browser_name = "Mozilla Firefox";
        browser_version = userAgent.split("Firefox/")[1];
    } else if (userAgent.indexOf("Chrome") > -1) {
        browser_name = "Google Chrome";
        browser_version = userAgent.split("Chrome/")[1].split(" ")[0];
    } else if (userAgent.indexOf("Safari") > -1) {
        browser_name = "Apple Safari";
        browser_version = userAgent.split("Version/")[1].split(" ")[0];
    } else if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1) {
        browser_name = "Microsoft Internet Explorer";
        browser_version = userAgent.split("MSIE ")[1] || userAgent.split("rv:")[1];
    } else {
        browser_name = "Unknown";
        browser_version = "Unknown";
    }
    return { browser_name, browser_version };
}