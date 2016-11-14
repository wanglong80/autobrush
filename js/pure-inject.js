// Chrome API (IN content_script)
; (function () {

    // Exist in array
    function contains(array, element) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] == element) {
                return true;
            }
        }

        return false;
    }

    // Dynamic create div and write text
    function createDiv(id, obj) {
        var div = document.createElement('div');
        div.setAttribute('id', id);
        div.style.display = 'none';
        div.innerText = JSON.stringify(obj);
        document.body.appendChild(div);
    }

    // Dynamic load stylesheet
    function loadStyle(href) {
        href = chrome.runtime.getURL(href);
        var style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = href;
        document.head.appendChild(style);
    }

    // Async load script
    function loadScript(src, callback) {
        src = chrome.runtime.getURL(src);
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        script.onload = function () {
            callback && callback();
            script.onload = null;
            script.parentNode.removeChild(script);
        };
        document.head.appendChild(script);
    }

    // Sync load scripts
    function loadScripts(scripts, count, callback) {
        count = count || 0;
        if (count == scripts.length) {
            callback && callback();
        }
        else {
            loadScript(scripts[count], function () {
                loadScripts(scripts, ++count, callback);
            });
        }
    }

    window.PureInject = function (manifest) {

        createDiv('chrome_extension_pure_inject_message', {});

        // chrome.runtime.onMessage
        chrome.runtime.onMessage.addListener(function (message, sender) {
            var div = document.getElementById('chrome_extension_pure_inject_message');
            div.innerText = JSON.stringify({ message: message, sender: sender });
            div.click();
        });

        // chrome.storage
        if (contains(manifest.permissions, 'storage')) {
            chrome.storage.local.get(manifest.storage.items, function (obj) {
                createDiv('chrome_extension_pure_inject_storage', obj);
            });
        }

        // inject_scripts        
        loadScripts(manifest.inject_scripts[0].js);
        loadStyle(manifest.inject_scripts[0].css[0])
    }
})();