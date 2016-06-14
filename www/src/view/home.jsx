/**
 * Author: Zane 448482356@qq.com
 */

import "style/home.less";
import Unit from 'libs/unit';
import BaseModule from './baseModule';

class PageContent extends BaseModule {
    constructor(props) {
        super(props);
        this.state = {
            pullToRefresh: 1,
            data: null
        };
    }
    fetch() {
        Unit.ajax({
            api: 'home.json',
            loading: 1
        }, ret => {
            let data = ret.data;
            let fmtColumnData = Unit.fmtDataArry(data.column, 8);
            let fmtBrandData = Unit.fmtDataArry(data.brand, 12);
            this.setState({
                data: {
                    slideData: data.ad,
                    columnData:fmtColumnData,
                    singleData: data.singleProduct
                }
            });
        });
    }
    toComponentDidMount(contentDom) {
        this.fetch();
        contentDom.on('refresh', e => {
            this.fetch();
        });
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }
    toRender() {
        let data = this.state.data;
        return (
            <div>
                <Slider data={data.slideData} />
                <Column data={data.columnData} />
                <SortSub />
                <Single data={data.singleData} />
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
    componentDidMount() {
        if (!this.homeSlider) {
            this.homeSlider = F7.swiper('.home-slider-banner', {
                autoplay: 5000,
                pagination : '.home-slider-pagination'
            });
        } else {
            this.homeSlider.update(true);
        }
    }
    render() {
        let dataList = this.props.data.map((data, index) => {
            return (
                <a className="swiper-slide" href="#" key={index} data-page="goodsList">
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
    componentDidMount() {
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
        }
    }
    render() {
        let dataList = this.props.data.map((data, index) => {
            let children = data.map((data, index) => {
                return (
                    <div className="col-25" key={index}>
                        <a href="#" data-page="goodsList">
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
                    <a className="u-item-list" href="#" data-page="goodsList">
                        <p className="thumb">
                            <img src={data.src} />
                        </p>
                        <p>{data.name}</p>
                        <p>{data.title}</p>
                        <p className="price">
                            <span className="new">¥ {data.price}</span>
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
