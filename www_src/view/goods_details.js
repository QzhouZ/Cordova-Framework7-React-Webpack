'use strict';
var React = require('react');
var moment = require('moment');
var Unit = require('lib/unit')



var GoodsDetailsContent = React.createClass({
    getInitialState: function() {
        return {
            data: []
        }
    },
	render: function () {
        return (
            <div className="">
                <div id="tt">
                    111
                </div>
            </div>
        );
    },
    componentDidMount: function() {

    }
});



module.exports = {
    render: function(query) {
        React.render(
            <GoodsDetailsContent code={query} />,
            document.getElementById("goods_details_content")
        );
    }
};