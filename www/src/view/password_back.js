/**
 * Author: Fcc 448482356@qq.com
 * CreateDate: 2015-10-29
 */

'use strict';
var React = require('react');
var Unit = require('lib/unit');

var PasswordBackContent = React.createClass({
	render: function () {
        return (
            <div className="password-back-content">
                <div className="registerbox">
                    <div className="sbox">
                        <label className="flex">
                            <span className="textbox">登录账号：</span>
                            <input  className="account flex-col" type="text" placeholder="请输入6-20位字母、数字或邮箱后缀" ref="account"/>
                        </label>
                    </div>
                    <div className="sbox fix">
                        <div className="flex">
                            <span className="textbox phonetext">手机号码：</span>
                            <span  className="phone flex-col phonebig">158****7149</span>
                            <span className="code" >发送验证码</span>
                        </div>
                    </div>
                    <div className="sbox">
                        <label className="flex">
                            <span className="textbox">验证码：</span>
                            <input  className="password flex-col" type="text" placeholder="请输入您的短信验证码"  ref="codenum"/>
                        </label>
                    </div>
                </div>
                <div className="passwordbtnbox">
                    <a  className="login-btn" onClick={this.register} href="view/password_change.html">下一步</a>
                </div>
             </div>
        );
    }
});
module.exports = PasswordBackContent;