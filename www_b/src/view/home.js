/**
 * Author: Zane 448482356@qq.com
 * CreateDate: 2015-10-26
 */

'use strict';
var React = require('react');
var moment = require('moment');
var Unit = require('lib/unit');

var HomeContent = React.createClass({
    getInitialState: function() {
        return {
            slideData: [],
            columnData: [],
            brandData: [],
            hotData: [],
            newData: [],
            singleData: []
        }
    },
    getData: function(callBack) {
        var that = this;
        Unit.ajax({
            api: 'home'
        }, function(data) {
            var res = data.data;
            if (data.status == 1) {
                var fmtColumnData = Unit.fmtDataArry(res.column, 8);
                var fmtBrandData = Unit.fmtDataArry(res.brand, 12);
                that.setState({
                    slideData: res.ad,
                    columnData:fmtColumnData,
                    brandData: fmtBrandData,
                    hotData: res.hot,
                    newData: res.newProduct,
                    singleData: res.singleProduct
                });
                callBack && callBack();
            }
        });
    },
    render: function () {
        var state = this.state;
        return (
            <div className="home-content">
                <div className="pull-to-refresh-layer">
                    <div className="preloader"></div>
                    <div className="pull-to-refresh-arrow"></div>
                </div>
                <Slider data={state.slideData} />
                <Column data={state.columnData} />
                <SortSub />
                <Brand data={state.brandData} />
                <HotSale data={state.hotData} />
                <New data={state.newData} />
                <Single data={state.singleData} />
            </div>
        );
    },
    componentDidMount: function() {
        var that = this;
        var ptrContent = $$('#home_content');
        that.getData();
        ptrContent.on('refresh', function (e) {
            that.getData();
        });
    }
});

// 广告轮播
var Slider = React.createClass({
    render: function() {
        var dataList = this.props.data.map(function(data, index) {
            return (
                <a className="swiper-slide" href={data.href} key={index}>
                    <img className="swiper-lazy" data-src={data.src} />
                    <div className="preloader"></div>
                </a>
            );
        });
        return (
            <div className="swiper-container home-slider-banner">
                <div className="swiper-wrapper">
                    {dataList}
                </div>
                <div className="swiper-pagination home-slider-pagination"></div>
            </div>
        );
    },
    componentDidUpdate: function() {
        if (!window.homeSlider) {
            window.homeSlider = F7.swiper('.home-slider-banner', {
                loop: true,
                lazyLoading: true,
                autoplay: 5000,
                pagination : '.home-slider-pagination'
            });
        } else {
            homeSlider.update(true);
        }
    }
});

// 分类栏目
var Column = React.createClass({
    render: function() {
        var dataList = this.props.data.map(function(data, index) {
            var children = data.map(function(data, index) {
                return (
                    <div className="col-25" key={index}>
                        <a href="view/goods_list.html?id=1">
                            <img src={data.icon} /></a>
                    </div>
                );
            });
            return (
                <div className="swiper-slide" key={index}>
                    <div className="row">
                        {children}
                    </div>
                </div>
            );
        });
        return (
            <div className="home-sort">
                <div className="swiper-container home-slider-sort">
                    <div className="swiper-wrapper">
                        {dataList}
                    </div>
                    <div className="swiper-pagination home-sort-pagination"></div>
                </div>
            </div>
        );
    },
    componentDidUpdate: function() {
        var data = this.props.data;
        var pagination = '';
        if (data.length > 1) {
            pagination = '.home-sort-pagination';
        }
        if (!window.homeSliderSort) {
            window.homeSliderSort = F7.swiper('.home-slider-sort', {
                pagination : pagination
            });
        } else {
            homeSliderSort.update(true);
        }
    }
});

// 二级分类栏目
var SortSub = React.createClass({
    render: function() {
        return (
            <div className="home-sort-sub">
                <div className="row">
                    <a className="col-20 active" href="view/symptom.html">按症找药</a>
                    <a className="col-20" href="#">男性</a>
                    <a className="col-20" href="#">女性</a>
                    <a className="col-20" href="#">老人</a>
                    <a className="col-20" href="#">小孩</a>
                </div>
            </div>
        );
    }
});

// 促销
var Promotion = React.createClass({
    render: function() {
        return (
            <div className="home-box home-box-promotion">
                <div className="bd">
                    <a className="left" href="#">
                        <div className="time-limit">
                            <img src="img/cx_msg.png" />
                            <div className="time">
                                <span className="t" ref="hours">00</span>
                                <span className="p"></span>
                                <span className="t" ref="minute">00</span>
                                <span className="p"></span>
                                <span className="t" ref="second">00</span>
                            </div>
                        </div>
                        <div className="info">
                            <img src="data/img/cx_1.png" alt=""/>
                        </div>
                        <div className="price">
                            <span className="old">¥4010.00</span>
                            <span className="new">¥300.00</span>
                        </div>
                    </a>
                    <div className="right">
                        <a className="b1" href="#">
                            <div className="l1">
                                <img src="data/img/cx_2.png"/>
                            </div>
                            <div className="l2">
                                <img className="mb10" src="img/miaosha.png"/>
                                <div className="price">
                                    <div className="old mb5">¥2010.00</div>
                                    <div className="new ml30">¥100.00</div>
                                </div>
                            </div>
                        </a>
                        <a className="b2" href="#">
                            <div className="info flex flex-between">
                                <div className="brand">
                                    <img src="img/jhlx.png"/>
                                </div>
                                <div className="thumb">
                                    <img src="data/img/cx_3.png"/>
                                </div>
                            </div>
                            <div className="price tr">
                                <span className="old">¥400.00</span>
                                <span className="new ml20">¥300.00</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        );
    },
    componentDidMount: function() {
        var that = this;
        var hour = $$(this.refs.hours.getDOMNode());
        var minute = $$(this.refs.minute.getDOMNode());
        var second = $$(this.refs.second.getDOMNode());
        // 限时促销倒计时
        window.countDownTimer = setInterval(function () {
            var now = moment().format('YYYY-MM-DD HH:mm:ss');
            var endTime = '2015-10-29 15:56:33';
            var diff = moment(endTime).diff(moment(now), 'seconds');

            var h = Unit.fixTime(parseInt(diff / 3600));
            var m = Unit.fixTime(parseInt(diff / 60 % 60));
            var s = Unit.fixTime(parseInt(diff % 60));
            if (parseInt(diff % 60) < 0) {
                clearInterval(countDownTimer);
            }
            hour.text(h);
            minute.text(m);
            second.text(s);

        }.bind(this), 1000);
    },
    // Dom销毁的时候清除计时
    componentWillUnmount: function() {
        clearInterval(countDownTimer);
    }
});

// 品牌专区
var Brand = React.createClass({
    render: function() {
        var paddingBottom = {
            paddingBottom: this.props.data.length > 1 ? '20px': 0
        };
        var dataList = this.props.data.map(function(data, index) {
            var children = data.map(function(data, index) {
                return (
                    <li key={index}>
                        <a href="view/goods_list.html">
                            <img src={data.src} />
                        </a>
                    </li>
                );
            });
            return (
                <div className="swiper-slide" key={index}>
                    <ul className="bd">
                        {children}
                    </ul>
                </div>
            );
        });
        return (
            <div className="home-box home-box-brand">
                <div className="hd">
                    品牌专区
                </div>
                <div className="swiper-container home-slider-brand" style={paddingBottom}>
                    <div className="swiper-wrapper">
                        {dataList}
                    </div>
                    <div className="swiper-pagination home-brand-pagination"></div>
                </div>
            </div>
        );
    },
    componentDidUpdate: function() {
        var data = this.props.data;
        var pagination = '';
        if (data.length > 1) {
            pagination = '.home-brand-pagination';
        }
        if (!window.homeSlideBrand) {
            window.homeSlideBrand = F7.swiper('.home-slider-brand', {
                pagination : pagination
            });
        } else {
            homeSlideBrand.update(true);
        }
    }
});

// 热卖
var HotSale = React.createClass({
    render: function() {
        if (this.props.data.length) {
            var data = this.props.data;
        } else {
            var data = [];
            data[0] = {};
            data[1] = {};
            data[2] = {};
            data[3] = {};
        }
        return (
            <div className="home-box home-box-promotion">
                <div className="hd" style={{borderLeft: '4px solid #7f42b3'}}>
                    热卖专区
                </div>
                <div className="bd">
                    <a className="left" href="#" style={{width: '35%'}}>
                        <div className="time-limit">
                            <img src="img/hot_msg.png" />
                        </div>
                        <div className="info">
                            <img src="data/img/cx_1.png" alt=""/>
                            <p className="name ell">{data[0].name}</p>
                            <p className="name ell">{data[0].title}</p>
                        </div>
                        <div className="price">
                            <span className="old">¥{data[0].oldPrice}</span>
                            <span className="new">¥{data[0].price}</span>
                        </div>
                    </a>
                    <div className="right" style={{width: '65%'}}>
                        <a className="b1" href="#">
                            <div className="ll1 ml10">
                                <p>{data[1].name}</p>
                                <p>{data[1].title}</p>
                                <div className="price mt10">
                                    <span className="old">¥{data[1].oldPrice}</span>
                                    <span className="new ml10">¥{data[1].price}</span>
                                </div>
                            </div>
                            <div className="ll2">
                                <img src="data/img/hot_1.png" />
                            </div>
                        </a>
                        <div className="b2 b2-e">
                            <a className="ll3" href="#">
                                <p className="thumb">
                                    <img src="data/img/hot_2.png"/>
                                </p>
                                <p className="ell">{data[2].name}  {data[2].title}</p>
                                <div className="price">
                                    <span className="old">¥{data[2].oldPrice}</span>
                                    <span className="new ml10">¥{data[2].price}</span>
                                </div>
                            </a>
                            <a className="ll3" href="#">
                                <p className="thumb">
                                    <img src="data/img/hot_2.png"/>
                                </p>
                                <p className="ell">>{data[3].name}  >{data[3].title}</p>
                                <div className="price">
                                    <span className="old">¥{data[3].oldPrice}</span>
                                    <span className="new ml10">¥{data[3].price}</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

// 新品推荐
var New = React.createClass({
    render: function() {
        var dataList = this.props.data.map(function(data, index) {
            return (
                <li key={index}>
                    <a className="u-item-list" href="view/goods_list.html">
                        <p className="thumb">
                            <img src={data.src} />
                        </p>
                        <p>{data.name}</p>
                        <p>{data.title}</p>
                        <p className="price">
                            <span className="old">¥{data.oldPrice}</span>
                            <span className="new ml10">¥{data.price}</span>
                        </p>
                    </a>
                </li>
            );
        });
        return (
            <div className="goods-list-2">
                <div className="hd">
                    <span className="tit"></span>
                </div>
                <ul className="bd">
                    {dataList}
                </ul>
            </div>
        );
    }
});

// 单品推荐
var Single = React.createClass({
    render: function() {
        var dataList = this.props.data.map(function(data, index) {
            return (
                <li key={index}>
                    <a className="u-item-list" href="view/goods_list.html">
                        <p className="thumb">
                            <img src={data.src} />
                        </p>
                        <p>{data.name}</p>
                        <p>{data.title}</p>
                        <p className="price">
                            <span className="old">¥{data.oldPrice}</span>
                            <span className="new ml10">¥{data.price}</span>
                        </p>
                    </a>
                </li>
            );
        });
        return (
            <div className="goods-list-2">
                <div className="hd">
                    <span className="tit tit-single"></span>
                </div>
                <ul className="bd">
                    {dataList}
                </ul>
            </div>
        );
    }
});

module.exports = HomeContent;
