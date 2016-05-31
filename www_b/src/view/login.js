/**
 * Author: Fcc 448482356@qq.com
 * CreateDate: 2015-10-29
 */

'use strict';
var React = require('react');
var Unit = require('lib/unit');

var LoginContent = React.createClass({
    getInitialState: function() {
        return {
            switchState: 1
        }
    },
	login: function() {
        var that = this;
		var user = this.refs.user.getDOMNode().value;
        var password = this.refs.password.getDOMNode().value;
        if (user == '') {
            F7.alert('用户名不能为空！');
            return;
        }
        if (password == '') {
            F7.alert('密码不能为空！');
            return;
        }
        F7.showIndicator();
        Unit.ajax({
            api: 'search_hot'
        }, function(data) {
            F7.hideIndicator();
            if (data.status == 1) {
                currentView.router.back();
            }
        });
	},
    switch: function() {
        var state = this.state.switchState;
        this.setState({
            switchState: !state
        });
    },
	render: function () {
        var state = this.state.switchState;
        var switchClass = 'state-img ';
        var passwordType = 'text';
        if (!state) {
            switchClass += 'active';
            passwordType = 'password';
        }
        return (
            <div className="login-content">
            	<div className="ucenter-top">
                    <div className="avatar">
                        <img src="img/avatar.png"/>
                    </div>
                </div>
                <div className="login-up">
                    <div className="login-up-sbox">
                        <label className="fix">
                            <input  className="user" type="text" placeholder="输入您的登录账号/手机号码" ref="user" />
                        </label>
                    </div>
                    <div className="login-up-sbox">
                        <label className="fix">
                            <input id="password" className="password" type={passwordType} placeholder="输入您的密码" ref="password" />
                            <div className="pwimgbox"><span  className={switchClass} onClick={this.switch}></span></div>
                        </label>
                    </div>
                </div>
                <div className="login-btnbox">
                    <span  className="login-btn" onClick={this.login}>登录</span>
                </div>
                <div className="login-link fix">
                    <span ><a href="view/register.html" className="lfbox">注册</a></span>
                    <span ><a href="view/password_back.html" className="lrbox">找回密码</a></span>
                </div>
            </div>
        );
    }
});

module.exports = LoginContent;