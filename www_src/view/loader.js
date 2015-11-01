/**
 * 加载提示组件
 * Author: Zane 448482356@qq.com
 * Date: 2015-10-11
 **/

'use strict';
var React = require('react');
var Unit = require('lib/unit');


var Loader = React.createClass({
    render: function() {
        var dataLen = this.props.dataLen;
        var isLoad = this.props.isLoad;
        var content = <i className="preloader"></i>;
        if (isLoad) {
            content = "";
            if (!dataLen) {
                content =<span>{this.props.msg?this.props.msg:'没有相关数据'}</span>;
            }
        }
        return (
            <div className="tc mt10 g9">
                {content}
            </div>
        )
    }
});

module.exports = Loader;