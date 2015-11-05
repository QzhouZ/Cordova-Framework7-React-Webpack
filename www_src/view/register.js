/**
 * Author: Fcc 448482356@qq.com
 * CreateDate: 2015-10-29
 */

'use strict';
var React = require('react');
var Unit = require('lib/unit');

var RegisterContent = React.createClass({
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
    agreeCheck: function (){
        var domname=$$("#agree").attr("class");
        if(domname == "agree-img"){
            $$("#agree").addClass("active");
        }else{
            $$("#agree").removeClass("active");
        }
    },
    render: function () {
        return (
            <div className="regiser-content">
                <div className="registerbox">
                    <div className="sbox">
                        <label>
                            <span className="textbox">登录账号：</span>
                            <input  className="account" type="text" placeholder="请输入6-20位字母、数字或邮箱后缀" ref="account"/>
                        </label>
                    </div>
                    <div className="sbox">
                        <label>
                            <span className="textbox">登录密码：</span>
                            <input  className="password" type="password" placeholder="请输入6-20位字母、数字或特殊字符" ref="password"/>
                        </label>
                    </div>
                    <div className="sbox">
                        <label>
                            <span className="textbox">确认密码：</span>
                            <input  className="sameword" type="password" placeholder="请输入6-20位字母、数字或特殊字符"  ref="sameword"/>
                        </label>
                    </div>
                    <div className="sbox fix">
                        <label className="fix phonebox">
                            <span className="textbox phonetext">绑定手机：</span>
                            <input  className="phone" type="text" placeholder="请输入您的手机号" ref="phone"/>
                        </label>
                        <div className="codebox"><span className="code" >发送验证码</span></div>
                    </div>
                    <div className="sbox">
                        <label>
                            <span className="textbox">验证码：</span>
                            <input  className="password" type="text" placeholder="请输入您的短信验证码"  ref="codenum"/>
                        </label>
                    </div>
                </div>
                <div className="agreebox fix">
                    <div className="fix agree-sbox">
                        <span id="agree" className="agree-img" onClick={this.agreeCheck}></span>
                        <span className="agree-text">已阅读<a href="">《*****协议》</a>,同意协议并注册</span>
                    </div>
                </div>
                <div className="register-btnbox">
                    <span  className="login-btn" onClick={this.register}>注册</span>
                </div>
            </div>
        );
    }
});

module.exports = RegisterContent;