/**
 * Author: Zane 448482356@qq.com
 */

import "./style/m";
import "./style/flex";
import "./style/base";
import "./style/view_1";
import "./style/view_2";

import Home from 'view/home';

window.$$ = Framework7.$;

// 实例化
window.F7 = new Framework7({
    modalTitle: '提示信息',
    modalButtonOk: '确认',
    modalButtonCancel: '取消',
    swipeBackPage: false,
    cache: false,
    swipePanel: 'left'
});

// 初始化视图
window.mainView = F7.addView('.view-main', {
    dynamicNavbar: true,
    domCache: true
});
$$(document).on('ajaxStart', function () {
    //F7.showIndicator();
});
$$(document).on('ajaxComplete', function () {
    F7.hideIndicator();
    F7.pullToRefreshDone();
});


$$(document).on('click', 'a[data-page]', function(e) {
    var link = $$(e.target);
    if (!link.is('a[data-page]')) {
        link = link.parents('a[data-page]');
    }
    var page = link.attr('data-page');
    var query = link.attr('data-query');
    var view = link.attr('data-view');
    var container;
    if (view) {
        if (view == 'leftView') {
            container = leftView;
        } else {
            container = mainView;
        }
    } else {
        container = mainView;
    }
    container.router.load({
        content: '<div class="navbar"><div class="navbar-inner"></div></div><div class="page navbar-fixed toolbar-fixed" data-page="' + page + '"></div>',
        query: query
    });
}, true);

$$(document).on('pageBeforeInit', function(e) {
    var page = e.detail.page;
    $$(page.navbarInnerContainer).html(
        '<div class="left">' +
        '<a href="#" class="back link"><i class="icon icon-back-white"></i><span>返回</span></a>' +
        '</div>' +
        '<div class="center sliding">Settings</div>'
    );

});
$$(document).on('pageAfterAnimation', function(e) {
    var page = e.detail.page;
    var Component = require('view/' + page.name);
    ReactDOM.render( 
        <Component query={page.query} />,
        page.container
    );
});
ReactDOM.render( 
    <Home / > ,
    document.getElementById('home')
);
