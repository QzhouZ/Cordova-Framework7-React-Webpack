/**
 * Author: Zane 448482356@qq.com
 * CreateDate: 2015-10-26
 */

'use strict';
var React = require('react');
var Unit = require('lib/unit')

var UcenterContent = React.createClass({
	render: function () {
        return (
            <div className="ucenter-content">
            	<div className="ucenter-top">
                    <div className="avatar">
                        <img src="img/avatar.png"/>
                        <div className="loin-info">
                            <a href="view/login.html">登录／注册</a>
                        </div>
                    </div>
                    <div className="sub-box flex">
                        <a className="collect flex flex-col-center flex-center" href="view/collect.html">
                            <div>
                                <img src="img/star.png" />
                            </div>
                            <div className="text">
                                <p className="tc">16</p>
                                <p>我的收藏</p>
                            </div>
                        </a>
                        <a className="footmark flex flex-col-center flex-center" href="view/footmark.html">
                            <div>
                                <img src="img/footer.png" />
                            </div>
                            <div className="text">
                                <p className="tc">32</p>
                                <p>我的足迹</p>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="list-block order-content">
                    <ul>
                        <li>
                            <a href="#" className="item-link item-content">
                                <div className="item-media">
                                    <i className="icon-c icon-order"></i>
                                </div>
                                <div className="item-inner">
                                    <div className="item-title">全部订单</div>
                                    <div className="item-after">查看全部预购订单</div>
                                </div>
                            </a>
                        </li>
                        <li className="flex order-list">
                            <a className="item" href="#">
                                <img src="img/dps.png" />
                                <span className="badge position-badge">1</span>
                            </a>
                            <a className="item" href="#">
                                <img src="img/dsh.png" />
                            </a>
                            <a className="item dpj" href="#">
                                <img src="img/dpj.png" />
                            </a>
                            <a className="item th" href="#">
                                <img src="img/th.png" />
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="list-block">
                    <ul>
                        <li>
                            <a href="#" className="item-link item-content">
                                <div className="item-media">
                                    <i className="icon-c icon-location"></i>
                                </div>
                                <div className="item-inner">
                                    <div className="item-title">收获地址管理</div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="item-link item-content">
                                <div className="item-media">
                                    <i className="icon-c icon-user"></i>
                                </div>
                                <div className="item-inner">
                                    <div className="item-title">个人信息管理</div>
                                    <div className="item-after">请完善您的个人资料</div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="item-link item-content">
                                <div className="item-media">
                                    <i className="icon-c icon-lock"></i>
                                </div>
                                <div className="item-inner">
                                    <div className="item-title">密码变更</div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="item-link item-content">
                                <div className="item-media">
                                    <i className="icon-c icon-mobile"></i>
                                </div>
                                <div className="item-inner">
                                    <div className="item-title">绑定手机变更</div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="list-block">
                    <ul>
                        <li>
                            <a href="#" className="item-link item-content">
                                <div className="item-media">
                                    <i className="icon-c icon-message"></i>
                                </div>
                                <div className="item-inner">
                                    <div className="item-title">消息</div>
                                    <div className="item-after">查看历史消息</div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = UcenterContent;