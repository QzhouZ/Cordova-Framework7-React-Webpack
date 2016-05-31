'use strict';
var React = require('react');

var pageContent = React.createClass({
    getInitialState: function() {
        return {
           data: [{
               name: '首页',
               href: '#home',
               icon: 'icon-home'
           },{
               name: '分类',
               href: '#cate',
               icon: 'icon-cate'
           },{
               name: '预购篮',
               href: '#cart',
               icon: 'icon-cart'
           },{
               name: '我的',
               href: '#ucenter',
               icon: 'icon-me'
           }]
        }
    },
    render: function() {
        var that = this;
        var dataList = this.state.data.map(function(data, index) {
            var tabClassName = 'tab-item ';
            var badge = null;
            var iconName = 'footer-icon ' + data.icon;
            if (that.props.index == index) {
                tabClassName += 'active';
            }
            if (data.href == '#cart') {
                badge = <div className="badge position-badge">1</div>;
            }
            return (
                <a className={tabClassName} key={index}>
                    <span className={iconName}></span>
                    <span className="tab-label">{data.name}</span>
                    {badge}
                </a>
            );
        });
        return (
            <div className="toolbar-inner">
                {dataList}
            </div>
        );
    }
});



module.exports = pageContent;


