/**
 * Author: Zane 448482356@qq.com
 * CreateDate: 2015-10-26
 */

'use strict';
var React = require('react');
var Unit = require('lib/unit');
var Loader = require('./loader');

var CateContent = React.createClass({
    getInitialState: function() {
        return {
            active: 0,
            data: [],
            subData: [],
            isLoad: 0
        }
    },
    switch: function(index, id) {
        // 如果是当前的，点击就不再请求了
        if (this.state.active == index) {
            return;
        }
        this.setState({
            active: index,
            subData: [],
            isLoad: 0
        });
        this.getSubData(id);
    },
    getSubData: function(id) {
        var that = this;
        Unit.ajax({
            api: 'sub_cate',
            params: {
                id: id
            }
        }, function(data) {
            if (data.status == 1) {
                that.setState({
                    subData: data.data,
                    isLoad: 1
                });
            }
        });
    },
    render: function () {
        var that = this;
        var dataList = this.state.data.map(function(data, index) {
            var className = '';
            if (that.state.active == index) {
                className = 'active';
            }
            return (
                <li className={className} onClick={that.switch.bind(that, index, data.id)} key={index}>{data.name}</li>
            );
        });

        return (
            <div className="cate-content flex">
                <div className="cate-list">
                    <ul>
                        {dataList}
                    </ul>
                </div>
                <SubCate data={this.state.subData} isLoad={this.state.isLoad}  />
            </div>
        );
    },
    componentDidMount: function() {
        var that = this;
        Unit.ajax({
            api: 'cate'
        }, function(data) {
            if (data.status == 1) {
                var dataList = data.data;
                that.setState({
                    data: dataList
                });
                that.getSubData(dataList[0].id);
            }
        });
    }
});

var SubCate = React.createClass({
    getInitialState: function() {
        return {
            data: []
        }
    },
    render: function () {
        var dataList = this.props.data.map(function(data, index) {
            var child = data.children.map(function(data, index) {
                return (
                    <a href="#" key={index}>{data.name}</a>
                );
            });
            return (
                <div className="item-box" key={index}>
                    <div className="hd">{data.name}</div>
                    <div className="bd">
                        {child}
                    </div>
                </div>
            );
        });
        return (
            <div className="cate-list-item">
                {dataList}
                <Loader dataLen={this.props.data.length} isLoad={this.props.isLoad} />
            </div>
        );
    },
    componentWillReceiveProps: function(nextProps) {

    }
});

module.exports = CateContent;