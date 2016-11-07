$(function () {
    // 获取当前浏览器URL
    var url = window.location.href;

    function xpath(path) {
        try {
            return $(document).xpath(path);
        }
        catch (e) {
            e.xpath = path;
            console.log(e);
            return null;
        }
    }

    // 监听键盘事件
    $(document).keypress(function (e) {
        //console.log(e)
        if (e.shiftKey == true && e.key == "Enter") {
            var $activeElement = $(document.activeElement);

            // 读取本地存储的roles字段里的数据
            chrome.storage.local.get("roles", function (obj) {
                var roles = obj.roles;
                for (var key in roles) {
                    var role = roles[key];
                    var rurl = role.url;
                    rurl = rurl.replace(/\./g, '\\.');
                    rurl = rurl.replace(/\*/g, '[a-zA-Z_-]*');
                    rurl = '^' + rurl;

                    var pattern = new RegExp(rurl);

                    // 与当前URL匹配
                    if (pattern.exec(url)) {
                        if (role.focus != "" && xpath(role.focus) && !xpath(role.focus).is($activeElement)) {
                            continue;
                        }

                        var arr = role.content;
                        arr = arr.reverse();

                        for (var i in arr) {
                            var obj = arr[i];
                            console.log(obj);

                            if (obj.value == '{click}') {
                                var xo = xpath(obj.selector);
                                if (xo) {
                                    xo.each(function(){
                                        this.click();
                                    });
                                }
                            }
                            else {
                                xpath(obj.selector) && xpath(obj.selector).val(obj.value);
                            }

                            console.log('end')
                        }
                    }
                }
            });
        }
    });
});