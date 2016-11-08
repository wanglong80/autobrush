jQuery.noConflict();
; (function ($) {
    // 填充间隔速率（毫秒）
    const INTERVAL = 10;
    // 当前页面网址
    const URL = window.location.href;

    var doc = $(document);

    function log(msg, data, color) {
        color = color || 'yellow';
        console.group("%c" + msg + ":", "background:" + color + ";");
        console.log(data);
        console.groupEnd();
    }

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

    // 绑定angular数据
    function applyScope(scope, dataNgModel, value) {
        var arr = dataNgModel.split('.');
        for (var i = 0; i < arr.length - 1; i++) {
            scope = scope[arr[i]];
        }
        scope[arr[arr.length - 1]] = value;
    }

    // 执行规则
    function execRoles(roles) {
        var $activeElement = $(document.activeElement);
        log("当前焦点元素", $activeElement.eq(0) || null);

        for (var key in roles) {
            var role = roles[key];
            var rurl = role.url;
            rurl = rurl.replace(/\./g, '\\.');
            rurl = rurl.replace(/\*/g, '[a-zA-Z_-]*');
            rurl = '^' + rurl;

            var pattern = new RegExp(rurl);

            // 与当前URL匹配
            if (pattern.exec(URL)) {
                log("URL匹配成功", URL);
                if (role.focus != "" && xpath(role.focus) && !xpath(role.focus).is($activeElement)) {
                    log("Focus匹配失败", role.focus);
                    continue;
                }

                var arr = role.content;
                arr = arr.reverse();

                var i = 0;
                var timer = setInterval(function () {
                    if (i >= arr.length) {
                        clearInterval(timer);
                        return false;
                    }

                    var obj = arr[i];

                    if (obj.value == '{click}') {
                        var xo = xpath(obj.selector);
                        if (xo) {
                            xo.each(function () {
                                log("点击元素", this);
                                this.click();
                            });
                        }
                    }
                    else {
                        var com = xpath(obj.selector);
                        if (com && com.length > 0) {
                            log("填充元素", obj);
                            com.val(obj.value);

                            // 使用Angular的项目尝试进行数据绑定
                            if (angular) {
                                var dataNgModel = com.attr('data-ng-model');
                                if (dataNgModel) {
                                    log("Angular绑定", dataNgModel);
                                    var dom = com[0];
                                    var scope = angular.element(dom).scope();
                                    applyScope(scope, dataNgModel, obj.value);
                                }
                            }
                        }
                        else {
                            log("没有找到填充元素", obj, 'red');
                        }
                    }

                    i++;
                }, INTERVAL);
            }
        }
    }

    function keyEvent(e) {
        if (e.shiftKey == true && e.key == "Enter") {
            log('按下了激活键', e.key);
            var data = document.getElementById("chrome_plugin_autobrush_mid_data").innerText;
            data = JSON.parse(data);
            execRoles(data.roles);
        }
    }

    doc.keypress(keyEvent);
})(window.jQuery);