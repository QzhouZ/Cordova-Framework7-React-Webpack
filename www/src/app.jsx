/**
 * Author: Zane 448482356@qq.com
 */

import "./style/m.less";
import "./style/flex.less";
import "./style/base.less";
import "font-awesome/css/font-awesome.css";

window.$$ = Framework7.$;

// 实例化
window.F7 = new Framework7({
    modalTitle: '提示信息',
    modalButtonOk: '确认',
    modalButtonCancel: '取消',
    swipeBackPage: true,
    cache: false,
    swipePanel: 'left'
});

// 初始化视图
window.mainView = F7.addView('#home', {
    dynamicNavbar: true,
    domCache: true
});

$$(document).on('ajaxStart',  () => {
    //F7.showIndicator();
});

$$(document).on('ajaxComplete', () => {
    F7.hideIndicator();
    F7.pullToRefreshDone();
});


/**
 * 添加页面视图
 * @param view 视图名称
 */
let addView = view => {
    window.mainView = F7.addView('#' + view, {
        dynamicNavbar: true,
        domCache: true
    });
    pageContentRender(view);
}

let pageContentRender = (page, query) => {
    var view = require('view/' + page);
    var PageContent = view.pageContent;
    var PageFooter = view.pageFooter;
    var PageClass = view.pageClass;
    if (PageClass) {
        $$(mainView.activePage.container).addClass(PageClass);
    }
    ReactDOM.render( 
        <PageContent query={query} />,
        mainView.activePage.container
    );
    if (PageFooter) {
        $$(mainView.activePage.container).append(PageFooter);
    }
}

$$(document).on('click', 'a[data-page]', e => {
    var link = $$(e.target);
    if (!link.is('a[data-page]')) {
        link = link.parents('a[data-page]');
    }
    var page = link.attr('data-page');
    var query = link.data('query');
    // 将参数重组成字面量对象
    if (query) {
        var queryArr = query.split('&');
        var q = {};
        for (var k in queryArr) {
            var qArr = queryArr[k].split('=');
            q[qArr[0]] = qArr[1];
        }
        query = q;
    }
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
        content: `
                <div class="navbar">
                    <div class="navbar-inner"></div>
                </div>
                <div class="page no-tabbar" data-page="${page}"></div>
                `,
        query: query
    });
});

$$(document).on('pageBeforeInit', e => {
    var page = e.detail.page;
    var view = require('view/' + page.name);
    var pageTitle = view.pageTitle;
    var navbar = view.navbar;
    if (navbar) {
        $$(page.navbarInnerContainer).html(navbar);
    } else {
        $$(page.navbarInnerContainer).html(`
            <div class="left">
                <a href="#" class="back link"><i class="icon icon-back"></i><span>返回</span></a>
            </div>
            <div class="center sliding">${pageTitle}</div>
            <div class="right"></div>
        `);
    }
});

$$(document).on('pageAfterAnimation', e => {
    var page = e.detail.page;
    pageContentRender(page.name, page.query);
});

pageContentRender('home');

// 各页面视图显示事件处理，载入对应视图内容
$$('.views >.tab').on('show', e => {
    let view = e.srcElement.id;
    addView(view);
});


