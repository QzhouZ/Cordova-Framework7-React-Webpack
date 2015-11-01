'use strict';
var React = require('react');



var QuickMenu = React.createClass({
    render: function() {
        return (
            <div className="list-block">
                <ul>
                    <li>
                        <a href="#home" className="item-link item-content close-popover back" data-animate-pages="false" data-force="true">
                            <div className="flex flex-center">
                                <i className="icon-c icon-home"></i>
                                <span className="text">首页</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#cate" className="item-link item-content close-popover back" data-animate-pages="false" data-force="true">
                            <div className="flex flex-center">
                                <i className="icon-c icon-cate"></i>
                                <span className="text">分类</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#cart" className="item-link item-content close-popover back" data-animate-pages="false" data-force="true">
                            <div className="flex flex-center">
                                <i className="icon-c icon-cart"></i>
                                <span className="text">购物车</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#ucenter" className="item-link item-content close-popover back" data-animate-pages="false" data-force="true">
                            <div className="flex flex-center">
                                <i className="icon-c icon-me"></i>
                                <span className="text">我的</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="item-link item-content close-popover">
                            <div className="flex flex-center">
                                <i className="icon-c icon-scan"></i>
                                <span className="text">扫一扫</span>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
});



module.exports = QuickMenu;


