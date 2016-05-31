/**
 * Author: Zane 448482356@qq.com
 */


import Unit from 'libs/unit';

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
                    singleData: res.singleProduct
                });
                callBack && callBack();
            }
        });
    },
    render: function () {
        var state = this.state;
        return (
            <div className="page-content home-content">
                <div className="pull-to-refresh-layer">
                    <div className="preloader"></div>
                    <div className="pull-to-refresh-arrow"></div>
                </div>
                <Slider data={state.slideData} />
                <Column data={state.columnData} />
                <SortSub />
                <Brand data={state.brandData} />
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
    },
    componentWillReceiveProps: function(nextProps) {
        console.log(nextProps);
    }
});

// 广告轮播
var Slider = React.createClass({
    render: function() {
        var dataList = this.props.data.map(function(data, index) {
            return (
                <a className="swiper-slide" href="#" key={index} data-page="goods_list" data-query="name=tom&id=1">
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
    test: function() {
        mainView.router.load({
            content: '<div class="navbar"><div class="navbar-inner"></div></div><div class="page navbar-fixed toolbar-fixed" data-page="goods_list"></div>'
        });
    },
    render: function() {
        var that = this;
        var dataList = this.props.data.map(function(data, index) {
            var children = data.map(function(data, index) {
                return (
                    <div className="col-25" key={index} onClick={that.test}>
                        <a href="#">
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
