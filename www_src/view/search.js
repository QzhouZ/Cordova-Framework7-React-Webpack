/**
 * Author: Zane 448482356@qq.com
 * CreateDate: 2015-10-28
 */

'use strict';
var React = require('react');
var Unit = require('lib/unit');

var SearchContent = React.createClass({
    getInitialState: function() {
        return {
            data: []
        }
    },
    clear: function() {
        F7.confirm('确认删除全部历史记录吗？','', function() {
            console.log(1);
        });
    },
    render: function () {
        var dataList = this.state.data.map(function(data, index) {
            return (
                <a href={'view/goods_list.html?id='+data.id} key={index}>{data.name}</a>
            );
        });
        return (
            <div className="search-content">
                <div className="search-box">
                    <div className="hd flex flex-between flex-center">
                        最近搜索
                        <img className="trash" src="img/trash.png" onClick={this.clear} />
                    </div>
                    <div className="bd">
                        <a href="#">平板</a>
                        <a href="#">平板2</a>
                        <a href="#">平板3</a>
                        <a href="#">平板</a>
                        <a href="#">平板2</a>
                        <a href="#">平板3</a>
                    </div>

                </div>
                <div className="search-box">
                    <div className="hd">
                        热门搜索
                    </div>
                    <div className="bd">
                        {dataList}
                    </div>

                </div>
            </div>
        );
    },
    componentDidMount: function() {
        var that = this;
        Unit.ajax({
            api: 'search_hot'
        }, function(data) {
            if (data.status == 1) {
                that.setState({
                    data: data.data
                });
            }
        });
    }
});

module.exports = SearchContent;