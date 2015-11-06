/**
 * Author: Zane 448482356@qq.com
 * CreateDate: 2015-11-05
 */

'use strict';
var React = require('react');
var Unit = require('lib/unit');
var Loader = require('./loader');

var PageContent = React.createClass({
    render: function () {
        return (
            <div className="symptom-tab">
                <div className="tabs">
                    <div className="tab active" id="symptom_crowd">
                        <Cate url="crowd" subUrl="sub_cate" />
                    </div>
                    <div className="tab" id="symptom_department">
                        <Cate url="department" subUrl="sub_cate" />
                    </div>
                </div>
            </div>
        );
    },
    componentDidMount: function() {
        $$("#symptom_crowd").on("show", function(e) {
            e.stopPropagation();
        });
        $$("#symptom_department").on("show", function(e) {
            e.stopPropagation();
        });
    }
});
var Cate = React.createClass({
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
            api: this.props.subUrl,
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
            var src = data.icon;
            if (that.state.active == index) {
                className = 'active';
                src = data.iconActive;
            }
            return (
                <li className={className} onClick={that.switch.bind(that, index, data.id)} key={index}>
                    <p>
                        <img src={src} />
                    </p>
                    <p>{data.name}</p>
                </li>
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
            api: this.props.url
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
    render: function () {
        var dataList = this.props.data.map(function(data, index) {
            return (
            <a href="view/goods_list.html" className="item-link item-content" key={index}>
                <div className="item-inner">
                    <div className="item-title">{data.name}</div>
                </div>
            </a>

            );
        });
        return (
            <div className="cate-list-item">
                <div className="list-block">
                    <ul>
                        {dataList}
                    </ul>
                </div>
                <Loader dataLen={this.props.data.length} isLoad={this.props.isLoad} />
            </div>
        );
    }
});

module.exports = PageContent;