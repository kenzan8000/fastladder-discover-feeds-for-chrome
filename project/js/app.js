chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {

        var defaults = { fastladder: { url: '' } };
        chrome.storage.local.get(defaults, function(items) {
            // check if fastladder url is valid
            var fastladderUrl  = document.createElement('a');
            fastladderUrl.href = items.fastladder.url;
            if (fastladderUrl.protocol !== 'https:' && fastladderUrl.protocol !== 'http:') {
                chrome.tabs.create({ url: "view/options.html" });
                chrome.notifications.create(
                    "",
                    { type: "basic", title: "Fastladder URL is invalid.", message: "Check out your settings.", iconUrl:"icons/icon48.png" },
                    function(id) { }
                );
                return;
            }
            // discover feeds
            var url = tabs[0].url;
            var subscribeUrl = items.fastladder.url + "/subscribe?url=" + url;
            chrome.tabs.create({ url: subscribeUrl });
        });
    });
});
