/**
 * Author: Fcc 448482356@qq.com
 * CreateDate: 2015-10-29
 */

'use strict';
var React = require('react');
var Unit = require('lib/unit');

var RegisterContent = React.createClass({
    getInitialState: function() {
        return {
            switchState: 0
        }
    },
    agreeSwitch: function() {
        var state = this.state.switchState;
        this.setState({
            switchState: !state
        });
    },
    register: function() {
        var that = this;
        var account = this.refs.account.getDOMNode().value;
        var password = this.refs.password.getDOMNode().value;
        var sameword = this.refs.sameword.getDOMNode().value;
        var phone = this.refs.phone.getDOMNode().value;
        var codenum = this.refs.codenum.getDOMNode().value;
        if (account == '') {
            F7.alert('登陆账号不能为空！');
            return;
        }
        if (password == '') {
            F7.alert('密码不能为空！');
            return;
        }
        if (sameword != password ) {
            F7.alert('两次输入密码不一致！');
            return;
        }
        if (phone != "" ) {
            F7.alert('请输入正确的手机号！');
            return;
        }
        if (codenum == '') {
            F7.alert('短信验证码不能为空！');
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
    render: function () {
        var state = this.state.switchState;
        var agreeClass = 'agree-img ';
        var loginClass = 'login-btn '
        if (!state) {
            agreeClass += 'active';
        } else {
            loginClass += 'disabled'
        }
        return (
            <div className="regiser-content">
                <div className="registerbox">
                    <div className="sbox">
                        <label  className="flex">
                            <span className="textbox">登录账号：</span>
                            <input  className="account flex-col" type="text" placeholder="6-20位字母、数字或邮箱后缀" ref="account" maxlength="20 " />
                        </label>
                    </div>
                    <div className="sbox">
                        <label className="flex">
                            <span className="textbox">登录密码：</span>
                            <input  className="password flex-col" type="password" placeholder="6-20位字母、数字或特殊字符" ref="password"/>
                        </label>
                    </div>
                    <div className="sbox">
                        <label className="flex">
                            <span className="textbox">确认密码：</span>
                            <input  className="sameword flex-col" type="password" placeholder="6-20位字母、数字或特殊字符"  ref="sameword"/>
                        </label>
                    </div>
                    <div className="sbox fix">
                        <label className="flex">
                            <span className="textbox">绑定手机：</span>
                            <input  className="phone flex-col" type="text" placeholder="请输入手机号" ref="phone"/>
                            <div className="codebox"><span className="code" >发送验证码</span></div>
                        </label>
                    </div>
                    <div className="sbox">
                        <label className="flex">
                            <span className="textbox">验证码：</span>
                            <input  className="password flex-col" type="text" placeholder="请输入您的短信验证码"  ref="codenum"/>
                        </label>
                    </div>
                </div>
                <div className="agreebox fix">
                    <div className="fix agree-sbox">
                        <span id="agree"  className={agreeClass} onClick={this.agreeSwitch}></span>
                        <span className="agree-text">已阅读<a href="">《*****协议》</a>,同意协议并注册</span>
                    </div>
                </div>
                <div className="register-btnbox">
                    <span  className={loginClass} onClick={this.register}>注册</span>
                </div>
            </div>
        );
    }
});

module.exports = RegisterContent;