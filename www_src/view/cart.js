/**
 * Author: Zane 448482356@qq.com
 * CreateDate: 2015-11-03
 */

'use strict';
var React = require('react');
var Unit = require('lib/unit');

var CartContent = React.createClass({
    getInitialState: function() {
        return {
            data: [],
            fmtData: [],
            price: '0.00',
            freight: '0.00',
            checkStoresLen: 0,
            checkGoodsLen: 0
        }
    },
    checkItem: function(index, cindex) {
        var data = this.state.data;
        var checked = data[index].checked;
        if (cindex > -1) {
            var childrenData = data[index].children[cindex];
            var cChecked = childrenData.checked;
            if (cChecked == 2) {
                return;
            }
            childrenData.checked = !cChecked;
            // 判断是否选中了全部，禁用的当作已选来处理
            data[index].checked = data[index].children.every(function(data) {
                return data.checked;
            });
        } else {
            data[index].checked = !checked;
            data[index].children.map(function(data) {
                if (data.checked != 2) {
                    data.checked = !checked;
                }
            });
        }
        this.fmtData();
    },
    checkAll: function(checked) {
        var data = this.state.data;
        data.map(function (data) {
            var children = data.children;
            data.checked = !checked;
            children.map(function (data) {
                if (data.checked != 2) {
                    data.checked = !checked;
                }
            });
        });
        this.fmtData();
    },
    count: function(type, index, cindex) {
        var data = this.state.data;
        var childrenData = data[index].children[cindex];
        var number = childrenData.number;
        if (type) {
            number++;
        } else {
            number--;
        }
        if (number == 0) {
            Unit.toast('已到最低购买数量，无法再减少');
            return;
        }
        if (number > childrenData.stock) {
            Unit.toast('已达到最高购买数量，无法再增加');
            return;
        }
        childrenData.number = number;
        this.fmtData();
    },
    fmtData: function() {
        var fmtData = [];
        var checkStoresLen = 0;
        var checkGoodsLen = 0;
        var price = '0.00';
        var freight = '0.00';
        this.state.data.map(function(data) {
            var newData = {};
            var fmtChildren = [];
            var children = data.children;
            children.map(function(data) {
                if (data.checked == 1) {
                    checkGoodsLen ++;
                    fmtChildren.push(data);
                    // 计算商品金额
                    price = (parseFloat(price)+parseFloat(data.price*data.number)).toFixed(2);
                }
            });
            if (data.checked == 1) {
                checkStoresLen ++;
            }
            if (fmtChildren.length) {
                newData.id = data.id;
                newData.address = data.address;
                newData.mode = data.mode;
                newData.children = fmtChildren;
                fmtData.push(newData);
                // 计算配送金额
                freight = (parseFloat(freight)+parseFloat(data.freight)).toFixed(2);
            }
        });
        this.state.fmtData = fmtData;
        this.setState({
            price: price,
            freight: freight,
            checkStoresLen: checkStoresLen,
            checkGoodsLen: checkGoodsLen
        });
    },
    order: function() {
        console.log(this.state.fmtData);
    },
	render: function () {
        var data = this.state;
        var isCheckAllStores = 0;
        if (data.checkStoresLen == data.data.length) {
            isCheckAllStores = 1;
        }
        return (
            <div className="cart-content m-layout">
                <Store checkItem={this.checkItem} count={this.count} data={data.data} />
                <Footer
                    price={data.price}
                    freight={data.freight}
                    checkGoodsLen={data.checkGoodsLen}
                    checkAll={this.checkAll}
                    isCheckAllStores={isCheckAllStores}
                    order={this.order} />
            </div>
        );
    },
    componentDidMount: function() {
        var that = this;
        Unit.ajax({
            api: 'cart'
        }, function(data) {
            if (data.status == 1) {
                that.setState({
                    data: data.data
                });
            }
        });
    }
});

var Store =  React.createClass({
    check: function(index) {
        this.props.checkItem(index);
    },
    render: function () {
        var dataList = this.props.data.map(function(data, index) {
            var checkClass = 'u-check ';
            if (data.checked == 1) {
                checkClass += 'active';
            }
            return (
               <div className="store-list" key={index}>
                   <div className="store-name flex flex-center" onClick={this.check.bind(this, index)}>
                       <i className={checkClass}></i>
                       <img className="thumb" src={data.src} />
                       <span>{data.name}</span>
                   </div>
                   <div className="address list-block">
                       <ul>
                           <li>
                               <a href="#" className="item-link item-content">
                                   <div className="item-media">
                                       <i className="icon-c icon-location2"></i>
                                   </div>
                                   <div className="item-inner">
                                       <div className="item-title">{data.address}</div>
                                       <div className="item-after">{data.mode}</div>
                                   </div>
                               </a>
                           </li>
                       </ul>
                   </div>
                   <Goods data={data.children} index={index} checkItem={this.props.checkItem} count={this.props.count} />
               </div>
            );
        }.bind(this));
        return (
            <div className="cart-store-content layout-main">
                {dataList}
            </div>
        );
    }
});

var Goods = React.createClass({
    check: function(index) {
        this.props.checkItem(this.props.index, index);
    },
    count: function(type, index) {
        this.props.count(type, this.props.index, index);
    },
    render: function () {
        var dataList = this.props.data.map(function(data, index) {
            var checkClass = 'u-check ';
            if (data.checked == 1) {
                checkClass += 'active';
            } else if (data.checked == 2) {
                checkClass += 'disabled';
            }
            return (
                <li key={index}>
                    <div className="check-box" onClick={this.check.bind(this, index)}>
                        <i className={checkClass}></i>
                    </div>
                    <a className="u-item-list" href="view/goods_details.html?id=1">
                        <div className="thumb">
                            <img src={data.src} />
                        </div>
                        <div className="info">
                            <p>{data.name}</p>
                            <p>{data.subName}</p>
                            <p className="price">
                                <span className="old">¥{data.oldPrice}</span>
                                <span className="new ml10">¥{data.price}</span>
                            </p>
                            <p className="count-number">
                                <span>{data.message}</span>
                            </p>
                        </div>
                    </a>
                    <div className={data.stock?'u-count-content':'dn'}>
                        <div className="u-count-box">
                            <span className="minus" onClick={this.count.bind(this, 0, index)}>－</span>
                            <span className="input">{data.number}</span>
                            <span className="add" onClick={this.count.bind(this, 1, index)}>＋</span>
                        </div>
                    </div>
                </li>
            );
        }.bind(this));
        return (
            <div className="cart-goods-content">
                <div className="goods-list-1">
                    <ul className="bd">
                        {dataList}
                    </ul>
                </div>
            </div>
        );
    }
});

var Footer = React.createClass({
    getInitialState: function() {
        return {
            check: 0
        }
    },
    check: function() {
        var check = this.state.check;
        this.setState({
            check: !check
        });
        this.props.checkAll(check)
    },
    render: function () {
        var checkClass = 'u-check ';
        if (this.props.isCheckAllStores) {
            checkClass += 'active';
        }
        return (
            <div className="cart-footer-bar footer">
                <div className="toolbar tabbar-labels">
                    <div className="toolbar-inner">
                        <div className="check-box" onClick={this.check}>
                            <i className={checkClass}></i>
                        </div>
                        <div className="text">
                            <p>商品金额：</p>
                            <p>配送金额：</p>
                            <p>总金额：</p>
                        </div>
                        <div className="price">
                            <p>¥ {this.props.price}</p>
                            <p>¥ {this.props.freight}</p>
                            <p>¥ {(parseFloat(this.props.price)+parseFloat(this.props.freight)).toFixed(2)}</p>
                        </div>
                        <div>
                            <a className="u-btn btn-blue" onClick={this.props.order}>
                                立即预购({this.props.checkGoodsLen})
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
module.exports = CartContent;