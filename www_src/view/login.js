/**
 * Author: Fcc 448482356@qq.com
 * CreateDate: 2015-10-29
 */

'use strict';
var React = require('react');

var LoginContent = React.createClass({
	login: function() {
		var author = this.refs.author.getDOMNode().value;
		console.log(author);
		
	},
	render: function () {
        return (
            <div className="login-content">
            	<div className="ucenter-top">
                    <div className="avatar">
                        <img src="img/avatar.png"/>
                    </div>
                </div>
            	<input value="222" type="text" placeholder="Your name" ref="author" />
            	<div className="login-btn" onClick={this.login}>Login</div>
            </div>
        );
    }
});

module.exports = LoginContent;