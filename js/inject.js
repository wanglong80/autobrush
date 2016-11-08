var url = window.location.href;
var doc = $(document);

console.log($)

function xpath(path) {
    try {
        return doc.xpath(path);
    }
    catch (e) {
        e.xpath = path;
        console.log(e);
        return null;
    }
}

function applyScope(scope, dataNgModel, value) {
    var arr = dataNgModel.split('.');
    console.log(arr)
    var tmp = scope;
    for (var i=0;i<arr.length-1;i++) {
        tmp = tmp[arr[i]];
    }
    
    tmp[arr[arr.length-1]] = value;
}

function execRoles(roles) {
    var $activeElement = $(document.activeElement);

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
                        xo.each(function () {
                            this.click();
                        });
                    }
                }
                else {
                    if (xpath(obj.selector)) {
                        var com = xpath(obj.selector);
                        com.val(obj.value);

                        // 使用Angular的项目尝试进行数据绑定
                        if (angular) {
                            var dataNgModel = com.attr('data-ng-model');
                            console.log(dataNgModel)
                            var dom = com[0];
                            var scope = angular.element(dom).scope();
                            applyScope(scope, dataNgModel, obj.value);
                        }
                    }
                }
            }
        }
    }
}

function keyEvent(e) {
    console.log(e)
    if (e.shiftKey == true && e.key == "Enter") {
        var data = document.getElementById("data").innerText;
        var data = JSON.parse(data);
        execRoles(data.roles);
    }
}

doc.keypress(keyEvent);