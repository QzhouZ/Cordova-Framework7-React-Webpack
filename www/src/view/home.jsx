/**
 * Author: Zane 448482356@qq.com
 */

import "style/home.less";
import Unit from 'libs/unit';

class PageContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slideData: [],
            columnData: [],
            singleData: []
        };
    }
    getData() {
        let that = this;
        Unit.ajax({
            api: 'home'
        }, function(data) {
            let res = data.data;
            if (data.status == 1) {
                let fmtColumnData = Unit.fmtDataArry(res.column, 8);
                let fmtBrandData = Unit.fmtDataArry(res.brand, 12);
                that.setState({
                    slideData: res.ad,
                    columnData:fmtColumnData,
                    singleData: res.singleProduct
                });
            }
        });
    }
    componentDidMount() {
        let that = this;
        F7.initPullToRefresh('#home_content');
        let content = $$('#home_content');
        that.getData();
        content.on('refresh', e => {
            that.getData();
        });
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }
    render() {
        let state = this.state;
        return (
            <div id="home_content" className="page-content home-content pull-to-refresh-content">
                <div className="pull-to-refresh-layer">
                    <div className="preloader"></div>
                    <div className="pull-to-refresh-arrow"></div>
                </div>
                <Slider data={state.slideData} />
                <Column data={state.columnData} />
                <SortSub />
                <Single data={state.singleData} />
            </div>
        );
    }
}

// 广告轮播
class Slider extends React.Component {  
    constructor (props) {
        super(props)
        this.homeSlider = null;
    }  
    componentDidUpdate() {
        if (!this.homeSlider) {
            this.homeSlider = F7.swiper('.home-slider-banner', {
                autoplay: 5000,
                pagination : '.home-slider-pagination'
            });
        } else {
            this.homeSlider.update(true);
            this.homeSlider.slideTo(0);
        }
    }
    render() {
        let dataList = this.props.data.map((data, index) => {
            return (
                <a className="swiper-slide" href="#" key={index} data-page="goods_list">
                    <img src={data.src} />
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
    }
};

// 分类栏目
class Column extends React.Component {    
    constructor (props) {
        super(props)
        this.homeSliderSort = null;
    }
    componentDidUpdate() {
        let data = this.props.data;
        let pagination = '';
        if (data.length > 1) {
            pagination = '.home-sort-pagination';
        }
        if (!this.homeSliderSort) {
            this.homeSliderSort = F7.swiper('.home-slider-sort', {
                pagination : pagination
            });
        } else {
            this.homeSliderSort.update(true);
            this.homeSliderSort.slideTo(0);
        }
    }
    render() {
        let that = this;
        let dataList = this.props.data.map((data, index) => {
            let children = data.map((data, index) => {
                return (
                    <div className="col-25" key={index}>
                        <a href="#" data-page="goods_list">
                            <img src={data.icon} />
                        </a>
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
    }
};

// 二级分类栏目
class SortSub extends React.Component {      
    render() {
        return (
            <div className="home-sort-sub">
                <div className="row">
                    <a className="col-20 active" href="#">按症找药</a>
                    <a className="col-20" href="#">男性</a>
                    <a className="col-20" href="#">女性</a>
                    <a className="col-20" href="#">老人</a>
                    <a className="col-20" href="#">小孩</a>
                </div>
            </div>
        );
    }
};

// 单品推荐
class Single extends React.Component {    
    render() {
        let dataList = this.props.data.map((data, index) => {
            return (
                <li key={index}>
                    <a className="u-item-list" href="#" data-page="goods_list">
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
}

module.exports = {
    pageContent: PageContent
};
