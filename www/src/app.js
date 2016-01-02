/**
 * Author: Zane 448482356@qq.com
 * CreateDate: 2015-10-26
 */

'use strict';
var React = require('react');
var Unit = require('lib/unit');
var FooterBar = require('view/footer_bar');
require('./app.less');
window.$$ = Framework7.$;

// 实例化
window.F7 = new Framework7({
    modalTitle: '提示信息',
    modalButtonOk: '确认',
    modalButtonCancel: '取消',
    swipeBackPage: false,
    cache: false,
    //pushState: true,
    swipePanel: 'left'
});

$$(document).on('pageAfterAnimation', function (e) {
    var page = e.detail.page;
    loadComponent(page.name, page.query);
});

// 初始化视图
window.mainView = F7.addView('.view-main', {
    dynamicNavbar: false,
    domCache: true
});
$$(document).on('ajaxStart', function () {
    //F7.showIndicator();
});
$$(document).on('ajaxComplete', function () {
    F7.hideIndicator();
    F7.pullToRefreshDone();
});
initPage();
/**
 * 加载页面组件
 * @param page 页面名称
 */
function loadComponent(page, query) {
    var Component = require('view/' + page);
    React.render(
        <Component query={query} />,
        document.getElementById(page + '_content')
    );
}
// 初始化起始页
function initPage() {
    loadComponent('home');
    // 加载快速菜单
    loadComponent('quick_menu');
    $$('.footer-bar').each(function(index) {
        var id = $$(this).attr('id');
        initFooterBar(id, index);
    });
}
// 初始化底部导航
function initFooterBar(footId, index) {
    React.render(
        <FooterBar index={index} />,
        document.getElementById(footId)
    );
}
// android
if (F7.device.android) {
    // 物理返回键事件
    document.addEventListener('backbutton', function () {
        var backBtn = $$(document).find('.page-on-left');
        if (backBtn.length > 0) {
            currentView.router.back();
            return false;
        }
        var r = confirm('确定要退出吗？')
        if (r) {
            navigator.app.exitApp();
        }
    }, false);
}

