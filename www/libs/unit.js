/**
 * API调用封装
 * @param type:请求模式，get/post
 * @param data:请求的数据，名值
 * @param [successCallback]:请求成功回调函数
 * @param [errorCallback]:请求失败回调函数
 *
 */
let Unit = {
    url: '',
    ajax: function(options,successCallback, errorCallback) {
        var _defaParams = {
            // appKey: "21725276",
            // page: 1,
            // rows: 10,
            // timestamp: Math.round(new Date().getTime() / 1000)
            // callback: "JSONP"
        }
        var params = options.params || {};
        for (var k in _defaParams) {
            if (typeof params[k] === "undefined") {
                params[k] = _defaParams[k];
            }
        }
        var method = options.method || "get";
        var api = options.api || "";
        var url = '';
        if (api.indexOf('.json') > -1) {
            url = 'mock/' + api;
        } else {
            url =  options.url || this.url + api;
        }
        if (options.loading) {
            F7.showIndicator();
        }
        $$.ajax({
            method: method,
            url: url,
            data: params,
            dataType: "json",
            success: function(data) {
                if (data.status == 0) {
                    Unit.toast(data.info);
                } else {
                    successCallback && successCallback(data);
                }
            },
            error: function() {
                F7.hideIndicator();
                if (errorCallback) {
                    errorCallback();
                } else {
                    Unit.toast("网络出错啦～", 1000);
                }
            },
            timeout: 8000
        });
    }
};

// 获取设备可视宽度
Unit.clientWidth = document.body.clientWidth;
// 获取设备可视高度
Unit.clientHeight = document.body.clientHeight;


/**
 * 信息提示框
 * msg[string]: 信息内容
 * duration[number]: 持续时间
 */
Unit.toast = function(msg, duration) {
    var toast = $$('<div class="modal toast">'+msg+'</div>');
    if ($$('.toast').length) {
        return;
    }
    $$('body').append(toast);
    $$(toast).show();
    $$(toast).css({
        marginTop: - Math.round($$(toast).outerHeight() / 2) + 'px'
    });
    $$(toast).css({
        marginLeft: - Math.round($$(toast).outerWidth() / 2) + 'px'
    });
    $$(toast).addClass('modal-in').transitionEnd(function () {
    });
    $$(toast).on('click', function() {
        remove();
    });
    function remove() {
        $$(toast).removeClass('modal-in').addClass('modal-out').transitionEnd(function () {
            $$(this).remove();
        });
    }
    setTimeout(function() {
        remove();
    }, duration || 1500);
};


/**
 * 获取日期
 * @param  {[string]} type [为'y'，获取现在的年份,为'ym',获取年月,为'm',获取月,为'w',获取周]
 * @return {[type]}      [description]
 */
Unit.getDate = function(type) {
    var date = new Date();
    var y = date.getFullYear();
    var m = fixTime(date.getMonth()+1);
    var w = date.getDay();
    var d = fixTime(date.getDate());
    var res = y +"/"+ m +"/"+ d;
    if (type == 'y') {
        res = y;
    } else if (type == 'ym') {
        res = y + '-' + m;
    } else if (type == 'm') {
        res = m;
    } else if (type == 'w') {
        res = '周' + '日一二三四五六'.charAt(w);
    }
    return res;
};

/**
 * 获取第n天的时间
 * @param n
 * @returns {string}
 * @constructor
 */
Unit.GetDateTime = function(date, n) {
    var dd = new Date(date);
    dd.setDate(dd.getDate()+n);
    var y = dd.getFullYear();
    var m = fixTime(dd.getMonth()+1);
    var d = fixTime(dd.getDate());
    return y+"/"+m+"/"+d;
};

/**
 * 获取地址栏所有参数
 * @return {[type]} [description]
 */
Unit.getSearch = function () {
    var search = window.location.search;
    if (search) {
        var queryArr = search.split('?')[1].split('&');
        var q = {};
        for (var k in queryArr) {
            var qArr = queryArr[k].split('=');
            q[qArr[0]] = qArr[1];
        }
        return q;
    } else {
        return null;
    }
};

/**
 * 将一组数据格式化成多组
 * @param data 原始数组数据
 * @param items 每组数据数量
 * @returns {Array}
 */
Unit.fmtDataArry = function(data, items) {
    var page = [];
    var fmtData = [];
    var dataLen = data.length;
    page.length = Math.ceil(dataLen / items);
    for (var i = 0; i < page.length; i++) {
        var child = [];
        fmtData[i] = [];
        var len = items;
        if (dataLen <= items) {
            len = dataLen;
        }
        if (i > 0) {
            len = items*(i) + dataLen % items;
        }
        for (var m = i*items; m < len; m++) {
            child.push(data[m]);
        }
        fmtData[i] = child;
    }
    return fmtData;
};

Unit.fixTime = function(t) {
    if (t < 0) {
        t = "00";
    } else if (t < 10) {
        t = "0" +t;
    }
    return t;
};


module.exports = Unit;