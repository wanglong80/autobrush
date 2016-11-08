// 规则模块
(function () {
    var currentRoleId = "",
    defaultContent = [],
    $roleInnerTable = $('#J_role_inner_table'),
    $roleModal = $('#J_role_modal'),
    $roleModalTitle = $("#J_role_modal_title"),
    $roleModalInputName = $("#J_role_modal input[name=name]"),
    $roleModalInputUrl = $("#J_role_modal input[name=url]"),
    $roleModalInputFocus = $("#J_role_modal input[name=focus]");

    // 增加规则小项 按钮点击事件
    $("#J_role_item_add").click(function(){
        $roleInnerTable.editablerow().addRow();
        $("#J_role_wapper_table").scrollTop(0);
    });

    // 编辑规则小项 按钮点击事件
    $("body").on('click', ".J_role_item_edit", function () {
        var id = $(this).attr('data-id');
        currentRoleId = id;
        openRoleModal(id);
    });

    // 删除规则小项 按钮点击事件
    $("body").on('click', ".J_role_item_delete", function () {
        var id = $(this).attr('data-id');
        if (confirm("确实要删除该条规则吗？")) {
            deleteRole(id, loadRoles);
        }
    });

    // 默认加载一次规则列表
    loadRoles();

    // 规则保存按钮 点击事件
    $("#J_role_save").click(function () {
        var data = {};
        data['name'] = $roleModalInputName.val();
        data['url'] = $roleModalInputUrl.val();
        data['focus'] = $roleModalInputFocus.val();
        data['content'] = [];

        try {
            data['content'] = $roleInnerTable.data('editablerow').getAllData();

            if (currentRoleId == "") {
                insertRole(data, loadRoles);
            }
            else {
                updateRole(currentRoleId, data, loadRoles);
            }

            $roleModal.modal('hide');
        } catch (error) {
            alert('填充规则格式有误');
        }
    });

    // 增加新的规则 按钮点击事件
    $("#J_role_new").click(function () {
        currentRoleId = "";
        $roleModalTitle.text("添加一条新的填充规则");
        $roleModalInputName.val("");
        $roleModalInputUrl.val("");
        $roleModalInputFocus.val("");
        $("#J_role_inner_table tbody").html("");
        buildEditableRow();
        $roleInnerTable.editablerow().render();
        $roleModal.modal({backdrop: false, show: true});
    });

    // 打开规则编辑弹窗
    function openRoleModal(id) {
        $roleModalTitle.text("更新填充规则");
        findRoleById(id, function (role) {
            var content = JSON.stringify(role.content, null, 4);
            $roleModalInputName.val(role.name);
            $roleModalInputUrl.val(role.url);
            $roleModalInputFocus.val(role.focus);
            $("#J_role_inner_table tbody").html(createItemsTr(role.content));
            buildEditableRow();
            $roleInnerTable.editablerow().render();
            $roleModal.modal({backdrop: false, show: true});
        });
    }

    // 构建可编辑行插件
    function buildEditableRow() {
        $roleInnerTable.editablerow({
            columns: [{
                type: 'input',
                name: 'selector'
            }, {
                type: 'input',
                name: 'value'
            }, {
                type: 'input',
                name: 'comment'
            }],
            save: {
                callback: function (json) {
                    console.log(json)
                }
            },
            destroy: {
                before: function (data) {
                    return confirm('确定要删除吗？');
                },
                callback: function(json) {
                    console.log(json)
                }
            }
        });
    }

    // 加载规则列表
    function loadRoles() {
        findRoles(function (roles) {
            $("#role_list_tbody").html(createRolesTr(roles));
        });
    }

    // 创建规则小项列表
    function createItemsTr(data) {
        var html = "";
        for (var i in data) {
            var tr = "<tr><td>{selector}</td><td>{value}</td><td>{comment}</td></tr>";
            tr = tr.replace("{selector}", data[i].selector);
            tr = tr.replace("{value}", data[i].value);
            tr = tr.replace("{comment}", data[i].comment);
            html += tr;
        }
        return html;
    }

    // 创建规则列表
    function createRolesTr(data) {
        var html = "";
        for (var i in data) {
            var tr = "<tr><td>{name}</td><td>{url}</td><td><a class='J_role_item_edit' href='#' data-id={id}>编辑</a> <a class='J_role_item_delete' href='#' data-id={id}>移除</a></td></tr>";
            tr = tr.replace(/\{id\}/g, data[i].id);
            tr = tr.replace("{name}", data[i].name);
            tr = tr.replace("{url}", data[i].url);
            html += tr;
        }
        return html;
    }

    // 生成唯一ID
    function uniqueID() {
        var rand = parseInt(Math.random() * 899 + 100);
        var time = new Date().getTime();
        return (time + '' + rand);
    }

    // 查找所有规则
    function findRoles(callback) {
        chrome.storage.local.get("roles", function (obj) {
            var roles = obj.roles;
            if (!roles) {
                callback([]);
            }
            else {
                callback(roles);
            }
        });
    }

    // 根据规则ID查找
    function findRoleById(id, callback) {
        findRoles(function (roles) {
            for (var key in roles) {
                if (roles[key].id == id) {
                    callback(roles[key]);
                    return;
                }
            }

            callback([]);
        });
    }

    // 创建规则
    function insertRole(obj, callback) {
        obj.id = uniqueID();
        findRoles(function (roles) {
            if (roles.length > 0) {
                roles.push(obj);
            }
            else {
                roles = [obj];
            }

            chrome.storage.local.set({ "roles": roles }, callback);
        });
    }

    // 删除规则
    function deleteRole(id, callback) {
        findRoles(function (roles) {
            for (var key in roles) {
                if (roles[key].id == id) {
                    roles.splice(key, 1);
                    chrome.storage.local.set({ "roles": roles }, callback);
                    break;
                }
            }
        });
    }

    // 更新规则
    function updateRole(id, obj, callback) {
        findRoles(function (roles) {
            for (var key in roles) {
                if (roles[key].id == id) {
                    obj.id = id;
                    roles[key] = obj;
                    chrome.storage.local.set({ "roles": roles }, callback);
                    break;
                }
            }
        });
    }
})();