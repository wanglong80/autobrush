jQuery.noConflict();
; (function ($) {
    var config = {
        // 填充间隔速率（毫秒）
        interval: 1000,
        // 是否开启特效
        enableEffect: true,
        // 是否开启调试模式
        enableDebug: true
    };

    // 当前页面网址
    const URL = window.location.href;

    var doc = $(document);

    // 监听来自扩展程序的消息
    chrome.runtime.onMessage.addListener(function (message, sender) {
        if (message.execAction === true) {
            log('点击执行', '');
            execRoles(getRoles());
        }
    });

    // 跟踪调试
    function log(msg, data, color) {
        if (config.enableDebug) {
            color = color || 'yellow';
            console.group("%c" + msg + ":", "background:" + color + ";");
            console.log(data);
            console.groupEnd();
        }
    }

    // xpath 选择器
    function xpath(path) {
        try {
            return doc.xpath(path);
        }
        catch (e) {
            e.xpath = path;
            log("XPath语法错误", e);
            return null;
        }
    }

    function msgpop() {
        var html = "<div id='chrome-plugin-autobrush-msgpop'>\
        <p>Autobrush Running <span id='chrome-plugin-autobrush-msgpop-ddd'>. . .</span></p> \
        <div id='chrome-plugin-autobrush-msgpop-bar'></div>\
        </div>";
        var $div = $(html).hide().appendTo("body");

        var i = 0;
        setInterval(function(){
            var dot = '...'.substr(0, i);
            $("#chrome-plugin-autobrush-msgpop-ddd").text(dot);
            i = i == 3 ? 0 : ++i;
        }, 300);  
    }

    function msgpopBar(total, i) {
        var w = i / total * 100;
        $("#chrome-plugin-autobrush-msgpop-bar").width(w + "%");
    }

    function msgpopShow() {
        $("#chrome-plugin-autobrush-msgpop-bar").width("0%");
        $("#chrome-plugin-autobrush-msgpop").slideDown(200);
    }

    function msgpopClose() {
        $("#chrome-plugin-autobrush-msgpop").slideUp(200);
    }

    msgpop();
    //msgpopShow();

    // 行为特效
    function effect(dom, callback) {
        var top = dom.offset().top;
        var left = dom.offset().left;
        var width = dom.outerWidth();
        var height = dom.outerHeight();
        var marginTop = - ((40 - height) / 2);
        var marginLeft = - ((40 - width) / 2);

        var $div = $("<div class='chrome-plugin-autobrush-effect' style='top:" + top + "px;left:" + left + "px;'><div class='chrome-plugin-autobrush-effect--after' style='margin-top:" + marginTop + "px;margin-left:" + marginLeft + "px;'></div></div>").appendTo("body");
        setTimeout(function () {
            $div.remove();
            callback && callback();
        }, 600);
    }

    // 取得规则数据
    function getRoles() {
        var obj = chrome.storage.local.get("roles");
        return obj.roles;
    }

    // 绑定angular数据
    function applyScope(scope, dataNgModel, value) {
        var arr = dataNgModel.split('.');
        for (var i = 0; i < arr.length - 1; i++) {
            scope = scope[arr[i]];
        }
        scope[arr[arr.length - 1]] = value;
    }

    // 匹配合适的规则
    function matchRole(roles) {
        var $activeElement = $(document.activeElement);
        log('当前焦点元素', $activeElement.eq(0) || null);

        for (var key in roles) {
            var role = roles[key];

            if (role.url == undefined) {
                continue;
            }

            var rurl = role.url;

            rurl = rurl.replace(/\./g, '\\.');
            rurl = rurl.replace(/\*/g, '[a-zA-Z_-]*');
            rurl = '^' + rurl;

            var pattern = new RegExp(rurl);

            // 与当前URL匹配
            if (pattern.exec(URL)) {
                log('URL匹配成功', URL);
                if (role.focus != "" && xpath(role.focus) && !xpath(role.focus).is($activeElement)) {
                    log('Focus匹配失败', role.focus);
                    continue;
                }

                config.interval = role.delay;

                // 规则数据
                var arr = role.content;
                arr = arr.reverse();
                return arr;
            }
        }

        return [];
    }

    // 执行规则
    function execRoles(roles) {
        log('当前的URL', URL);
        log('获取规则数据', roles);

        var arr = matchRole(roles);

        var timer = null;
        var timerStatus = 1; // 执行状态: 0停止 1执行 2暂停
        var oldTime = new Date().getTime();
        var delayTime = 0;
        var i = 0;
        var ii = 0;

        var stop = function () {
            timerStatus = 0;
        }

        var start = function () {
            timerStatus = 1;
        }

        var pause = function () {
            timerStatus = 2;
        }

        // 延迟
        function delay(millisecond, callback) {
            delayTime = millisecond;
            setTimeout(function(){
                oldTime = new Date().getTime();
                delayTime = 0;
                callback && callback();
            }, millisecond);
        }

        var action = function () {
            var currentTime = new Date().getTime();

            // 时间间隔计算器
            if (currentTime - oldTime - delayTime < config.interval) {
                return false;
            }

            if (timerStatus === 0) {
                i = 0; ii = 0;
                clearInterval(timer);
                return false;
            }
            else if (timerStatus === 2) {
                clearInterval(timer);
                return false;
            }

            // 结束
            if (i >= arr.length) {
                i = 0; ii = 0;
                clearInterval(timer);
                msgpopClose();
                return false;
            }

            var obj = arr[i];
            var com = xpath(obj.selector);

            if (com && com.length > 0 && com[0] !== false) {
                if (obj.value == '{click}') {
                    log('点击元素', com);
                    config.enableEffect && effect($(com));
                    delay(300, function(){
                        com[0].click();
                    });
                }
                else {
                    log('填充元素', obj);
                    com.val(obj.value);
                    //com.focus();
                    config.enableEffect && effect(com);

                    // 使用Angular的项目尝试进行数据绑定
                    if (angular) {
                        var dataNgModel = com.attr('data-ng-model');
                        if (dataNgModel) {
                            log('Angular绑定', dataNgModel);
                            var dom = com[0];
                            var scope = angular.element(dom).scope();
                            applyScope(scope, dataNgModel, obj.value);
                        }
                    }
                }
            }
            else {
                log('没有找到填充元素', obj, 'red');
            } 
            msgpopBar(arr.length, i);
            oldTime = new Date().getTime();
            i++;
        }

        timer = setInterval(action, 10);
    }

    // 快捷键启动
    function keyEvent(e) {
        if (e.shiftKey == true && e.key == "?") {
            console.clear();
            log('按下了激活键', e.key);
            msgpopShow();
            execRoles(getRoles());
        }
    }
    doc.keypress(keyEvent);
})(window.jQuery);