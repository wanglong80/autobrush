/* =========================================================
 * bootstrap-editablerow.js
 * https://github.com/lornewang/bootstrap-editablerow
 * =========================================================
 * Copyright 2012 Wang Long
 * http://wanglong.name
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */
;(function($) {
    var EditableRow = function(element, options) {
        var _this  = this, 
            $tbody = element.children('tbody'),
            $thead = element.children('thead'),
            $othead = $thead.clone();

        var editStack = [],
            editExtra = '<td width="30px"><a class="edit" href="javascript:;"><i class="glyphicon glyphicon-pencil"></i></a></td><td width="30px"><a class="delete" href="javascript:;"><i class="glyphicon glyphicon-trash"></i></a></td>',
            saveExtra = '<td width="30px"><a class="save" href="javascript:;"><i class="glyphicon glyphicon-ok"></i></a></td><td width="30px"><a class="cancel" href="javascript:;"><i class="glyphicon glyphicon-remove"></i></a></td>';

        // 保持表头有宽，为了防止编辑时拉宽列
        this.keepColsWidth = function() {
            if (editStack.length > 0) {
                $thead.find('th').each(function(){
                    $(this).attr('width', $(this).outerWidth());
                });
            }
        }

        // 清除表头宽设定
        this.clearColsWidth = function() {
            if (editStack.length < 1) {
                $thead.find('th').attr('width', null);
            }
        }

        // 取得一行数据元
        this.getRowData = function($tr) {
            var data = [];
            $tr.find('td').each(function(){
                data.push($(this).text());
            });
            return data;
        }

        // 取得一行编辑数据
        this.getEditRowJson = function($tr) {
            var data = {};

            var $tds = $tr.find('td');
            for (var i = 0; i < options.columns.length; i++) {
                var $td = $tds.eq(i);
                var fromControl = $td.find('input');
                var value = '';
                if (fromControl.length > 0) {
                    value = fromControl.val();
                }
                else {
                    value = $td.text();
                }

                data[options.columns[i].name] = value;
            }
            return data;
        }

        this.addslashes = function(str) {
            str = str.replace(/"/g, "&quot;");
            return str;
        }

        this.getEditRowData = function($tr) {
            var json = _this.getEditRowJson($tr);
            var data = [];
            for (var key in json) {
                data.push(json[key]);
            }
            return data;
        }

        // 构建列
        this.buildColsHtml = function(action, colsData) {
            var arr = [];
            for (var i = 0; i < options.columns.length; i++) {
                var text = '', html = '', type = '', name = '';
                if (colsData && colsData[i]) {
                    text = colsData[i];
                }

                text = this.addslashes(text);

                if (options.columns[i]) {
                    type = options.columns[i].type;
                    name = options.columns[i].name;
                }

                if (action == 'edit' || action == 'add') {
                    switch (type) {
                        case 'input': arr.push('<td><input name="' + name + '" type="text" class="form-control small input-sm" value="' + text + '"></td>');break;
                        default: arr.push('<td>' + text + '</td>');break;
                    }
                }
                else {
                    arr.push('<td>' + text + '</td>');
                }
            }

            if (action == 'add' || action == 'edit') {
                arr.push(saveExtra);
            }
            else if (action == 'restore' || action == 'save') {
                arr.push(editExtra);
            }
            
            return arr.join('');
        }

        // 得到所有数据
        this.getAllData = function() {
            var data = [];
            $tbody.find('tr').each(function(){
                var json = _this.getEditRowJson($(this));
                data.push(json);
            });

            return data;
        }

        // 渲染插件
        this.render = function() {
            $thead.html($othead.html()).find('tr').append('<th width="30px"></th><th width="30px"></th>');
            $tbody.find('tr').append(editExtra);
        }

        // 增加一行
        this.addRow = function() {
            editStack.push(true);
            _this.keepColsWidth();
            $tbody.prepend('<tr data-editablerow-thisnew="true">' + _this.buildColsHtml('add') + '</tr>');
        }

        $tbody
        .on('click', 'a.edit', function(e){
            e.preventDefault();
            var $tr = $(e.target).parents('tr').eq(0);
            editStack.push(true);
            _this.keepColsWidth();
            $tr.data('__editting', true);
            $tr.data('__data', _this.getRowData($tr));
            $tr.html(_this.buildColsHtml('edit', $tr.data('__data')));
        })
        .on('click', 'a.cancel', function(e){
            e.preventDefault();
            var $tr = $(e.target).parents('tr').eq(0);
            editStack.pop();
            _this.clearColsWidth();
            $tr.data('__editting', false);
            if ($tr.attr('data-editablerow-thisnew')) {
                $tr.remove();
            }
            else {
                $tr.html(_this.buildColsHtml('restore', $tr.data('__data')));
            }
        })
        .on('click', 'a.save', function(e){
            e.preventDefault();
            var $tr = $(e.target).parents('tr').eq(0);
            var data = _this.getEditRowData($tr);
            var json = _this.getEditRowJson($tr);
            options.save.callback && options.save.callback(json);
            $tr.html(_this.buildColsHtml('save', data));
            $tr.attr('data-editablerow-thisnew', null);
        })
        .on('click', 'a.delete', function(e){
            e.preventDefault();
            var $tr = $(e.target).parents('tr').eq(0);
            var json = _this.getEditRowJson($tr);

            if (options.destroy.before(json)) {
                $tr.remove();
            }
        })
    }

    $.fn.editablerow = function(options) {
        if (options) {
            options = $.extend(true, {
                save: {
                    dataType: 'json'
                },
                destroy: {
                    before: function(){
                        return true;
                    }
                }
            }, options);
        }
        else {
            return this.data('editablerow');
        }

        this.each(function() {
            var el = $(this);
            if ( ! el.data('editablerow'))
                el.data('editablerow', new EditableRow(el, options));
        });
        return this;
    }

})(window.jQuery);
