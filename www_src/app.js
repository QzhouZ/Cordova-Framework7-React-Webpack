/**
 * Author: Zane 448482356@qq.com
 * CreateDate: 2015-10-26
 */

'use strict';
var React = require('react');
var Unit = require('lib/unit');
var FooterBar = require('view/footer_bar');

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

// 页面动画结束回调
$$(document).on('pageAfterAnimation', function (e) {
    var page = e.detail.page;
    if (page.name == 'home') {
        renderFooterBar('home_footer', 0);
    }
    loadComponent(page.name, page.query);
});

// 初始化页面
window.currentView = F7.addView('#home_view', {
    dynamicNavbar: false
});

initPage();

// 各页面视图显示事件处理，载入对应视图内容
$$('.views >.tab').on('show', function(e) {
    var view = e.srcElement.id.split('_')[0];
    addView(view);
});

// 底部Tab切换
$$('.views').on('click', '.footer-bar .tab-item', function () {
    var index = $$(this).index();
    var view = '';
    if (index == 0) {
        view = 'home_view';
    } else if (index == 1) {
        view = 'cate_view';
    } else if (index == 2) {
        view = 'cart_view';
    } else if (index == 3) {
        view = 'ucenter_view';
    }
    F7.showTab('#' + view);
});

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
    $$('.footer-bar').each(function(index) {
        var id = $$(this).attr('id');
        renderFooterBar(id, index);
    });
}

// 初始化底部导航
function renderFooterBar(footId, index) {
    React.render(
        <FooterBar index={index} />,
        document.getElementById(footId)
    );
}

/**
 * 添加页面视图
 * @param view 视图名称
 */
function addView(view) {
    loadComponent(view);
    window.currentView = F7.addView('#' + view + '_view', {
        dynamicNavbar: false
    });
}

// android
if (F7.device.android) {
    // 物理返回键事件
    document.addEventListener('backbutton', function () {
        alert(backBtn);
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