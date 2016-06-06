'use strict';
var React = require('react');

var pageContent = React.createClass({
    getInitialState: function() {
        return {
            data: [{
                name: '首页',
                page: 'home',
                icon: 'icon-home'
            },{
                name: '分类',
                page: 'cate',
                icon: 'icon-cate'
            },{
                name: '预购篮',
                page: 'cart',
                icon: 'icon-cart'
            },{
                name: '我的',
                page: 'ucenter',
                icon: 'icon-me'
            }]
        }
    },
    load: function(page) {
        var pageLen = $$('.page').length;
        if (pageLen > 4) {
            return;
        }
        var url = mainView.url;
        mainView.router.load({
            animatePages: false,
            content: `
                    <div class="navbar">
                        <div class="navbar-inner"></div>
                    </div>
                    <div class="page cached" data-page="${page}"></div>
                    `
        });

        /*if (url.indexOf(page) == -1) {
            $$(".page").addClass('cached');
            mainView.router.load({
                pageName: page,
                animatePages: false
            });
            mainView.history.splice(0,1);
        }*/
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
            if (data.page == '#cart') {
                badge = <div className="badge position-badge">1</div>;
            }
            return (
                <a className={tabClassName} page="#" key={index} onClick={that.load.bind(null, data.page)}>
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


