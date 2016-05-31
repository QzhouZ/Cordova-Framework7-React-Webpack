'use strict';
var React = require('react');
var moment = require('moment');
var Unit = require('lib/unit');
var Loader = require('./loader');


var GoodsDetailsContent = React.createClass({
    getInitialState: function() {
        return {
            type: 1,
            sliderData: [],
            infoData: {}
        }
    },
	render: function () {
        var state = this.state;
        return (
            <div className="goods-details-content">
                <Slider data={state.sliderData} type={state.type} />
                <Info data={state.infoData} type={state.type} />
                <Tab  type={state.type} goodsId={this.props.query.id} />
            </div>
        );
    },
    componentDidMount: function() {
        var that = this;
        Unit.ajax({
            api: 'goods_info',
            params: {
                id: that.props.query.id
            }
        }, function(data) {
            var res = data.data;
            if (data.status == 1) {
                that.setState({
                    type: res.type,
                    sliderData: res.slider,
                    infoData: res.info
                });
            }
        });

        $$('#join_cart').on('click', function() {
            Unit.toast('已成功加入预购蓝!', 0, 1500);
        });
    }
});

var Slider = React.createClass({
    render: function() {
        var dataList = this.props.data.map(function(data, index) {
            return (
                <div className="swiper-slide" key={index}>
                    <img className="swiper-lazy" data-src={data.src} />
                    <div className="preloader"></div>
                </div>
            );
        });
        return (
            <div className="swiper-container goods-details-slider">
                <div className="swiper-wrapper">
                    {dataList}
                </div>
                <div className="swiper-pagination goods-slider-pagination"></div>
            </div>
        );
    },
    componentDidUpdate: function() {
        F7.swiper('.goods-details-slider', {
            loop: true,
            lazyLoading: true,
            pagination : '.goods-slider-pagination'
        });
    }
});

var Info = React.createClass({
    render: function() {
        var data = this.props.data;
        var type = this.props.type;
        var timeData = null;
        if (type > 1) {
            timeData = (function() {
                return (
                    <div className="time">
                        <i className="fa fa-clock-o"></i>
                        <span>限时促销</span>
                        <span className="countdown">（仅剩0天10小时8分56秒）</span>
                    </div>
                )
            }());
        }
        return (
            <div className="goods-details-info">
                <div className="name">{data.name}</div>
                <div className="price">
                    <span className="new">¥{data.price}</span>
                    <span className="old">¥{data.oldPrice}</span>
                    <span className="sells">{data.sellNumber}</span>
                </div>
                {timeData}
                <div className="info">
                    <p>{data.attr1}</p>
                    <p>{data.attr2}</p>
                    <p>{data.attr3}</p>
                    <p>{data.attr4}</p>
                    <p>{data.attr5}</p>
                    <p>
                        {data.store}
                        <span className="stock">库存{data.stock}</span>
                    </p>
                </div>
                <div className="score">
                    <p>
                        <span>配送评价</span>
                        <span className="u-star"><i style={{width:data.serviceScore}}></i></span>
                    </p>
                    <p>
                        <span>服务评价</span>
                        <span className="u-star"><i style={{width:data.sendScore}}></i></span>
                    </p>
                </div>
            </div>
        );
    },
    componentDidUpdate: function() {

    }
});

var Tab = React.createClass({
    getInitialState: function() {
        return {
            commentData: [],
            isLoad: 0
        }
    },
    render: function() {
        return (
            <div className="goods-details-tab">
                <div className="tab-list">
                    <a href="#goods_details_desc" className="tab-link active">商品详情</a>
                    <span className="line"></span>
                    <a href="#goods_details_comment" className="tab-link">评价</a>
                </div>
                <div className="tabs">
                    <div className="tab active" id="goods_details_desc">
                        <Desc />
                    </div>
                    <div className="tab" id="goods_details_comment">
                        <Comment data={this.state.commentData} isLoad={this.state.isLoad} />
                    </div>
                </div>
            </div>
        );
    },
    componentDidMount: function() {
        var that = this;
        $$("#goods_details_desc").on("show", function(e) {
            e.stopPropagation();
        });
        $$("#goods_details_comment").on("show", function(e) {
            Unit.ajax({
                api: 'goods_comment',
                params: {

                }
            }, function(data) {
                if (data.status == 1) {
                    that.setState({
                        commentData: data.data,
                        isLoad: 1
                    });
                }
            });
            e.stopPropagation();
        });
    }
});

var Desc = React.createClass({
    render: function() {
        return (
            <div className="desc-content">
                这里是详情内容
            </div>
        );
    },
    componentDidMount: function() {

    }
});

var Comment = React.createClass({
    render: function() {
        var dataList = this.props.data.map(function(data, index) {
            return (
                <div className="comment-list" key={index}>
                    <div className="name">{data.name}</div>
                    <div className="score">
                        <span className="u-star"><i style={{width:data.score}}></i></span>
                        <span className="time">{data.time}</span>
                    </div>
                    <div className="info">
                        {data.comment}
                    </div>
                </div>
            );
        });
        return (
            <div className="comment-content">
                {dataList}
                <Loader dataLen={this.props.data.length} isLoad={this.props.isLoad} msg="还没有任何评论" />
            </div>
        );
    }
});
module.exports = GoodsDetailsContent;