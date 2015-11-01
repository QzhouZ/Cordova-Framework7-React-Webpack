'use strict';


/**
 * API调用封装
 * @param type:请求模式，get/post
 * @param data:请求的数据，名值
 * @param [successCallback]:请求成功回调函数
 * @param [errorCallback]:请求失败回调函数
 *
 */
var Unit = {
    url: 'data/',
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
        var url = options.url || this.url + api;
        $$.ajax({
            method: method,
            url: url,
            data: params,
            dataType: "json",
            success: function(data) {
                Unit.loading("close");
                successCallback(data);
            },
            error: function() {
                Unit.loading("close");
                if (errorCallback) {
                    errorCallback();
                } else {
                    // Unit.loading("服务正在升级中，请稍后再试", 2000);
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
 * 加载层封装
 * msg[string]: 消息内容
 * type[number]: 加载层类型,若为0则不显示菊花
 * time[number]: 加载层存在时间
 */
Unit.loading = function(msg, type, time) {
    var tpl;
    var msg = msg || '';
    window.loadingDuration = '';
    var msk = ".loading-mask";
    if (window.loadingDuration) {
        clearTimeout(window.loadingDuration);
    }
    if (arguments[0] == "close") {
        $$(msk).remove();
        return false;
    }
    if (arguments.length == 2) {
        time = arguments[1];
    }
    if (time > 0) {
        window.loadingDuration = setTimeout(function() {
            $$(msk).animate({opacity: 0}, 500, 'ease-out', function() {
                $$(msk).remove();
            });
        }, time)
    }
    if ($$(msk).length > 0) {
        $$(msk).remove();
    }
    if (type == 0) {
        tpl = '<div class="loading-mask">'
                +'<div class="loading">'
                    +'<div>'+msg+'</div>'
                    +'</div>'
                +'</div>';
    } else {
        var msgHtml = '';
        if (msg) {
            msgHtml = '<div class="mt5">'+msg+'</div>';
        }
        tpl = '<div class="loading-mask">'
                +'<div class="loading">'
                    +'<i style="width:40px; height:40px" class="preloader preloader-white"></i>'
                    + msgHtml
                +'</div>'
            +'</div>';
    }
    $$("body").append(tpl);
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