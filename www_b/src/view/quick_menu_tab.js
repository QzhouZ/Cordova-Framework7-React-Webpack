/**
 * Author: Zane 448482356@qq.com
 * CreateDate: 2015-10-31
 */

'use strict';
var React = require('react');

var QuickMenu = React.createClass({
    getInitialState: function() {
        return {
            data: [{
                name: '首页',
                view: 'home_view',
                icon: 'icon-cate'
            },{
                name: '分类',
                view: 'cate_view',
                icon: 'icon-home'
            },{
                name: '预购篮',
                view: 'cart_view',
                icon: 'icon-cart'
            },{
                name: '我的',
                view: 'ucenter_view',
                icon: 'icon-me'
            },{
                name: '扫一扫',
                view: 'scan',
                icon: 'icon-scan'
            }]
        }
    },
    load: function(view) {
        if (view == 'scan') {
            return;
        }
        currentView.router.back({
            url: 'index.html',
            force: true,
            animatePages: false
        });
        if (view == currentView.selector) {
            return;
        }
        F7.showTab('#' + view);
       /* setTimeout(function() {
            $$('#home_content').html('');
        }, 500);*/
    },
    render: function() {
        var dataList = this.state.data.map(function(data, index) {
            var iconName = 'icon-c ' + data.icon;
            return (
                <li key={index}>
                    <a href="#" className="item-link item-content close-popover" onClick={this.load.bind(this, data.view)}>
                        <div className="flex flex-center">
                            <i className={iconName}></i>
                            <span className="text">{data.name}</span>
                        </div>
                    </a>
                </li>
            );
        }.bind(this));
        return (
            <div className="list-block">
                <ul>
                    {dataList}
                </ul>
            </div>
        );
    }
});



module.exports = QuickMenu;


