// 规则模块
(function () {

    var exportData = [{"content":[{"comment":"提还日期","selector":"/html/body/div[1]/div/div/form/div[2]/div/div[1]/span/input","value":"2016-9-9"},{"comment":"提还金额","selector":"/html/body/div[1]/div/div/form/div[2]/div/div[3]/span[2]/div/input","value":"880.88"},{"comment":"提还银行","selector":"/html/body/div[1]/div/div/form/div[2]/div/div[2]/span[2]/select","value":"string:农业银行"}],"focus":"/html/body/div[1]/div/div/form/div[2]/div[0]/div[1]/span/input","id":"1477986587333272","name":"还贷-还款","url":"http://tc.esf.fangdd.net/#/orderdetail.*"},{"content":[{"comment":"备注","selector":"//*[@id=\"textarea-channel-note\"]","value":"此为测试单"},{"comment":"挂牌价","selector":"//*[@id=\"yuqiPrice\"]","value":"888"},{"comment":"户籍","selector":"//*[@id=\"custHouseholder\"]","value":"上海闸北"},{"comment":"房源面积","selector":"//*[@id=\"houseArea\"]","value":"66"},{"comment":"业主电话","selector":"//*[@id=\"ownerPhone\"]","value":"15600000001"},{"comment":"业主姓名","selector":"//*[@id=\"ownerName\"]","value":"张珊珊"},{"comment":"房源编号","selector":"/html/body/div[6]/div[4]/div[2]/div/div[1]/div[1]/span[2]/input","value":"10086"},{"comment":"预计签定日期","selector":"//*[@id=\"laydate-signDate\"]","value":"明天下午三点"}],"focus":"","id":"1478486891447742","name":"CBS建报备","url":"http://cbs.esf.fangdd.net*"},{"content":[{"comment":"完成","selector":"/html/body/div[1]/div/div/form/div[3]/button[2]","value":"{click}"},{"comment":"出证日期","selector":"/html/body/div[1]/div/div/form/div[2]/div/div[3]/span[2]/input","value":"2014-6-4"},{"comment":"领证人员","selector":"/html/body/div[1]/div/div/form/div[2]/div/div[2]/span[2]/input","value":"王小姐"},{"comment":"领证日期","selector":"/html/body/div[1]/div/div/form/div[2]/div/div[1]/span/input","value":"2016-3-2"},{"comment":"签定-编辑","selector":"/html/body/div[3]/div/div/div[2]/div[2]/div/div[2]/div[4]/div[2]/div[1]/a[1]","value":"{click}"},{"comment":"完成","selector":"/html/body/div[1]/div/div/form/div[3]/button[2]","value":"{click}"},{"comment":"通知领证日期","selector":"/html/body/div[1]/div/div/form/div[2]/div/div[2]/span[2]/input","value":"2016-3-8"},{"comment":"过户日期","selector":"/html/body/div[1]/div/div/form/div[2]/div/div[1]/span/input","value":"2016-1-2"},{"comment":"登记过户-编辑","selector":"/html/body/div[3]/div/div/div[2]/div[2]/div/div[2]/div[3]/div[2]/div[1]/a[1]","value":"{click}"},{"comment":"缴税-完成","selector":"/html/body/div[1]/div/div/form/div[3]/button[2]","value":"{click}"},{"comment":"出契证日","selector":"/html/body/div[1]/div/div/form/div[2]/div[1]/div[6]/span[2]/input","value":"2016-2-5"},{"comment":"领取发票日期","selector":"/html/body/div[1]/div/div/form/div[2]/div[1]/div[5]/span[2]/input","value":"2016-2-4"},{"comment":"缴费日期","selector":"/html/body/div[1]/div/div/form/div[2]/div[1]/div[4]/span[2]/input","value":"2016-2-3"},{"comment":"审税日期","selector":"/html/body/div[1]/div/div/form/div[2]/div[1]/div[3]/span[2]/input","value":"2016-2-2"},{"comment":"审核价","selector":"/html/body/div[1]/div/div/form/div[2]/div[1]/div[2]/span[2]/div/input","value":"66.6"},{"comment":"税费结清日期","selector":"/html/body/div[1]/div/div/form/div[2]/div[1]/div[1]/span/input","value":"2016-2-1"},{"comment":"缴税-编辑","selector":"/html/body/div[3]/div/div/div[2]/div[2]/div/div[2]/div[2]/div[2]/div[1]/a[1]","value":"{click}"},{"comment":"权证-完成","selector":"/html/body/div[1]/div/div/form/div[3]/button[2]","value":"{click}"},{"comment":"是否限购","selector":"/html/body/div[1]/div/div/form/div[2]/div/div[2]/span/label[2]/input","value":"{click}"},{"comment":"查限购日期","selector":"/html/body/div[1]/div/div/form/div[2]/div/div[1]/span/input","value":"2016-1-1"}],"focus":"/html/body/div[1]/div/div/form/div[2]/div/div[1]/span/input","id":"1478504093375121","name":"模块--权证","url":"http://tc.esf.fangdd.net/#/orderdetail*"},{"content":[{"comment":"还款经营收入","selector":"/html/body/div[1]/div/form/div[3]/div[2]/div[2]/div[3]/div[2]/label[3]/input","value":"{click}"},{"comment":"在房多多过户","selector":"/html/body/div[1]/div/form/div[3]/div[2]/div[2]/div[3]/div[1]/label[3]/input","value":"{click}"},{"comment":"预收利息金额","selector":"/html/body/div[1]/div/form/div[3]/div[2]/div[2]/div[2]/div[4]/div/input","value":"1000"},{"comment":"预收利息期限","selector":"/html/body/div[1]/div/form/div[3]/div[2]/div[2]/div[2]/div[3]/div/input","value":"20"},{"comment":"房屋价格","selector":"/html/body/div[1]/div/form/div[3]/div[2]/div[2]/div[2]/div[2]/div/input","value":"666"},{"comment":"手续费","selector":"/html/body/div[1]/div/form/div[3]/div[2]/div[2]/div[2]/div[1]/div/input","value":"2999"},{"comment":"贷款期限","selector":"/html/body/div[1]/div/form/div[3]/div[2]/div[2]/div[1]/div[2]/div/input","value":"365"},{"comment":"贷款金额","selector":"/html/body/div[1]/div/form/div[3]/div[2]/div[2]/div[1]/div[1]/div/input","value":"88.88"}],"focus":"","id":"1478510405840912","name":"金融-新增报备","url":"http://10.0.6.58:8017/ddd-manage/index*"},{"content":[{"comment":"还款方式","selector":"/html/body/div[4]/div[2]/div/form/div[5]/div[2]/div[4]/select","value":"string:2"},{"comment":"申请年限","selector":"/html/body/div[4]/div[2]/div/form/div[5]/div[2]/div[3]/input","value":"30"},{"comment":"申请金额","selector":"/html/body/div[4]/div[2]/div/form/div[5]/div[2]/div[2]/input","value":"530.5"},{"comment":"贷款种类","selector":"/html/body/div[4]/div[2]/div/form/div[5]/div[2]/div[1]/select","value":"string:2"},{"comment":"是否自雇","selector":"/html/body/div[4]/div[2]/div/form/div[1]/div[2]/div[8]/select","value":"number:0"},{"comment":"婚姻状况","selector":"/html/body/div[4]/div[2]/div/form/div[1]/div[3]/div[1]/label[2]/input","value":"{click}"},{"comment":"补充公积金","selector":"/html/body/div[4]/div[2]/div/form/div[1]/div[2]/div[12]/input","value":"54654111"},{"comment":"公积金账号","selector":"/html/body/div[4]/div[2]/div/form/div[1]/div[2]/div[11]/input","value":"65254234"},{"comment":"家庭地址","selector":"/html/body/div[4]/div[2]/div/form/div[1]/div[2]/div[10]/input","value":"闸北区共和新路222弄"},{"comment":"家庭电话","selector":"/html/body/div[4]/div[2]/div/form/div[1]/div[2]/div[9]/input","value":"012-82971254"},{"comment":"税后月收入","selector":"/html/body/div[4]/div[2]/div/form/div[1]/div[2]/div[7]/input","value":"5000"},{"comment":"年限","selector":"/html/body/div[4]/div[2]/div/form/div[1]/div[2]/div[6]/input","value":"4"},{"comment":"担任职位","selector":"/html/body/div[4]/div[2]/div/form/div[1]/div[2]/div[5]/input","value":"医生"},{"comment":"工作单位","selector":"/html/body/div[4]/div[2]/div/form/div[1]/div[2]/div[4]/input","value":"上海市闸北区房多多"},{"comment":"总价","selector":"/html/body/div[4]/div[2]/div/form/div[2]/div[2]/div[4]/input","value":"660"},{"comment":"面积","selector":"/html/body/div[4]/div[2]/div/form/div[2]/div[2]/div[3]/input","value":"100"},{"comment":"房龄","selector":"/html/body/div[4]/div[2]/div/form/div[2]/div[2]/div[2]/input","value":"35"},{"comment":"具体位置","selector":"/html/body/div[4]/div[2]/div/form/div[2]/div[2]/div[1]/input","value":"普陀路222号10弄"},{"comment":"购房区域","selector":"/html/body/div[4]/div[2]/div/form/div[2]/div[2]/div[1]/select","value":"string:5"},{"comment":"身份证","selector":"/html/body/div[4]/div[2]/div/form/div[1]/div[2]/div[3]/div[2]/input","value":"310202198912123522"},{"comment":"联系电话","selector":"/html/body/div[4]/div[2]/div/form/div[1]/div[2]/div[2]/input","value":"13600000000"},{"comment":"姓名","selector":"/html/body/div[4]/div[2]/div/form/div[1]/div[2]/div[1]/input","value":"刘删删"}],"focus":"","id":"1478580504909929","name":"预授信系统","url":"*://pre-loan.esf.fangdd.com/#/add*"},{"content":[{"comment":"贷款年限","selector":"/html/body/div[1]/div/div/form/div[2]/div[2]/div[9]/span[2]/div/input","value":"30"},{"comment":"商贷金额","selector":"/html/body/div[1]/div/div/form/div[2]/div[2]/div[4]/span[2]/div/input","value":"888"},{"comment":"闸北支行","selector":"/html/body/div[1]/div/div/form/div[2]/div[2]/div[2]/span[2]/input","value":"闸北支行"},{"comment":"贷款银行","selector":"/html/body/div[1]/div/div/form/div[2]/div[2]/div[1]/span[2]/select","value":"string:农业银行"},{"comment":"外包机构","selector":"/html/body/div[1]/div/div/form/div[2]/div[1]/div[3]/span[2]/input","value":"中证集团"},{"comment":"贷款类型","selector":"/html/body/div[1]/div/div/form/div[2]/div[1]/div[2]/span/select/option[3]","value":"{click}"},{"comment":"申请日期","selector":"/html/body/div[1]/div/div/form/div[2]/div[1]/div[1]/span/input","value":"2014-9-1"}],"focus":"/html/body/div[1]/div/div/form/div[2]/div[1]/div[3]/span[2]/input","id":"1478675734409748","name":"模块-按揭","url":"http://tc.esf.fangdd.net/#/orderdetail*"},{"content":[{"comment":"买家电话","selector":"//*[@id=\"buyertable\"]/tbody/tr/td[2]/div/span[2]/input","value":"15133333333"},{"comment":"买家姓名","selector":"//*[@id=\"buyertable\"]/tbody/tr/td[1]/div/span[2]/input","value":"林美美"},{"comment":"卖家电话","selector":"//*[@id=\"sellertable\"]/tbody/tr/td[2]/span/span[2]/input","value":"13155556666"},{"comment":"卖家姓名","selector":"//*[@id=\"sellertable\"]/tbody/tr/td[1]/div/span[2]/input","value":"袁姗姗"}],"focus":"","id":"1478772975118547","name":"交易--新增报备","url":"http://tc.esf.fangdd.net/#/reportadd*"}];
    
    //chrome.storage.local.set({ "roles": exportData });


    var currentRoleId = "",
        defaultContent = [],
        $roleInnerTable = $('#J_role_inner_table'),
        $roleModal = $('#J_role_modal'),
        $roleModalTitle = $("#J_role_modal_title"),
        $roleModalInputName = $("#J_role_modal input[name=name]"),
        $roleModalInputUrl = $("#J_role_modal input[name=url]"),
        $roleModalInputFocus = $("#J_role_modal input[name=focus]");

    // 增加规则小项 按钮点击事件
    $("#J_role_item_add").click(function () {
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
        $roleModalTitle.text("添加一条新的行为规则");
        $roleModalInputName.val("");
        $roleModalInputUrl.val("");
        $roleModalInputFocus.val("");
        $("#J_role_inner_table tbody").html("");
        buildEditableRow();
        $roleInnerTable.editablerow().render();
        $roleModal.modal({ backdrop: false, show: true });
    });

    $( '#J_role_inner_table' ).DDSort({
        target: 'tr',           //示例而用，默认即'li'
        floatStyle: {           //示例二用，默认有一定的样式
            'border': '1px solid #ccc',
            'background-color': '#fff'
        }
    });

    // 打开规则编辑弹窗
    function openRoleModal(id) {
        $roleModalTitle.text("更新行为规则");
        findRoleById(id, function (role) {
            var content = JSON.stringify(role.content, null, 4);
            $roleModalInputName.val(role.name);
            $roleModalInputUrl.val(role.url);
            $roleModalInputFocus.val(role.focus);
            $("#J_role_inner_table tbody").html(createItemsTr(role.content));
            buildEditableRow();
            $roleInnerTable.editablerow().render();
            $roleModal.modal({ backdrop: false, show: true });
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
                callback: function (json) {
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