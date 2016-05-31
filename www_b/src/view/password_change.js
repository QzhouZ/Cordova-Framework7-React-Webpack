/**
 * Author: Fcc 448482356@qq.com
 * CreateDate: 2015-10-29
 */

'use strict';
var React = require('react');
var Unit = require('lib/unit');

var PasswordChangeContent = React.createClass({
    passwordBack:function(){
        var oldaccount = this.refs.account.getDOMNode().value;
        if (oldaccount == '') {
            F7.alert('原始密码不能为空！');
            return;
        }
        /*F7.showIndicator();
        Unit.ajax({
            api: 'search_hot'
        }, function(data) {
            F7.hideIndicator();
            if (data.status == 1) {
                currentView.router.back();
            }
        });*/
    },
	render: function () {
        return (
            <div className="password_change_content">
                <div className="registerbox">
                    <div className="sbox">
                        <label className="flex">
                            <span className="textbox">原始密码：</span>
                            <input  className="oldaccount flex-col" type="text" placeholder="请输入6-20位字母、数字或邮箱后缀" ref="account"/>
                        </label>
                    </div>
                </div>
                <div className="passwordbtnbox">
                    <a  className="login-btn" href="view/phone_change.html" onClick={this.passwordBack}>下一步</a>
                </div>
             </div>
        );
    }
});
module.exports = PasswordChangeContent;