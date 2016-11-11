// Chrome API Mock
; (function () {
    window.chrome = window.chrome || {};
    window.chrome.runtime = window.chrome.runtime || {};
    window.chrome.storage = window.chrome.storage || {};
    window.chrome.runtime.onMessage = window.chrome.runtime.onMessage || {};
    window.chrome.storage.local = window.chrome.storage.local || {};

    var messageStack = [];
    document.getElementById("chrome_extension_pure_inject_message").addEventListener("click", function (e) {
        if (messageStack.length > 0) {
            var text = e.target.innerText;
            var obj = JSON.parse(e.target.innerText);
            for (var i in messageStack) {
                messageStack[i](obj.message, obj.sender);
            }
            e.target.innerText = '';
        }
    });

    window.chrome.runtime.onMessage.addListener = function (callback) {
        messageStack.push(callback);
    }

    window.chrome.storage.local.get = function (key) {
        var str = document.getElementById("chrome_extension_pure_inject_storage").innerText;
        var obj = JSON.parse(str);
        return obj[key] ? obj : {};
    }
})();