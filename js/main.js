$(function () {
    // 获取当前浏览器URL
    var url = window.location.href;
    
    // 读取本地存储数据
    chrome.storage.local.get("roles", function (obj) {
        var data = JSON.stringify(obj);
        $("body").append("<div id='data' style='display:none;'>"+data+"</div>"); 

        var jquery = chrome.runtime.getURL("js/jquery.js");
        var jqueryXPath = chrome.runtime.getURL("js/jquery.xpath.js");
        var inject = chrome.runtime.getURL("js/inject.js");

        $.getScript(jquery, function(){
            $.getScript(jqueryXPath, function(){
                $.getScript(inject);
            });
        });
        
        // $("body").append("<script type='text/javascript' src='"+ jquery +"'></script>"); 
        // $("body").append("<script type='text/javascript' src='"+ jqueryXPath +"'></script>"); 
        // $("body").append("<script type='text/javascript' src='"+ inject +"'></script>"); 
    });
});