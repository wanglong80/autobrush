// 获取当前浏览器URL
var url = window.location.href;

// 动态加载脚本文件
function loadScript(src, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.onload = function(){
        script.parentNode.removeChild(script);
        callback && callback();
    };
    document.body.appendChild(script);
}

// 动态加载样式文件
function loadStyle(href) {
    var style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = href;
    document.body.appendChild(style);
}

// 读取本地存储数据
chrome.storage.local.get("roles", function (obj) {
    // 将数据注入到DOM
    var div = document.createElement("div");
    div.setAttribute("id", "chrome_plugin_autobrush_mid_data");
    div.style.display = "none";
    div.innerText = JSON.stringify(obj);
    document.body.appendChild(div);

    var jquery = chrome.runtime.getURL("js/jquery.js");
    var jqueryXPath = chrome.runtime.getURL("js/jquery.xpath.js");
    var injectJs = chrome.runtime.getURL("js/inject.js");
    var injectCss = chrome.runtime.getURL("css/inject.css");

    loadStyle(injectCss);
    loadScript(jquery, function () {
        loadScript(jqueryXPath, function () {
            loadScript(injectJs);
        });
    });
});