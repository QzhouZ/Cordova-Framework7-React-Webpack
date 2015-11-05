/**
 * 选择框组件
 * Author: Zane 448482356@qq.com
 * Date: 2015-11-03
 **/

'use strict';
var React = require('react');


var Check = React.createClass({
    render: function() {
        return (
            <div className="tc mt10 g9">
                {content}
            </div>
        )
    }
});

module.exports = Check;