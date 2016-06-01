import "style/goods_details.less";
import Unit from 'libs/unit';

class PageContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 1,
            sliderData: [],
            infoData: {}
        };
    }
	render() {
        let state = this.state;
        return (
            <div className="page-content goods-details-content">
                <Slider data={state.sliderData} type={state.type} />
                <Info data={state.infoData} type={state.type} />
                <Tab  type={state.type} goodsId={this.props.query.id} />
            </div>
        );
    }
    componentDidMount() {
        let that = this;
        Unit.ajax({
            api: 'goods_info',
            params: {
                id: that.props.query.id
            }
        }, function(data) {
            let res = data.data;
            if (data.status == 1) {
                that.setState({
                    type: res.type,
                    sliderData: res.slider,
                    infoData: res.info
                });
            }
        });

        $$('.page').on('click', '#join_cart', () => {
            Unit.toast('已成功加入预购蓝!', 0, 1500);
        });

        $$('.page').on('click', '#buy', () => {
            mainView.router.back({
                pageName: 'home?reload=1',
                force: true
            });
        });
    }
};

class Slider extends React.Component {
    componentDidUpdate() {
        F7.swiper('.goods-details-slider', {
            loop: true,
            lazyLoading: true,
            pagination : '.goods-slider-pagination'
        });
    }
    render() {
        let dataList = this.props.data.map((data, index) => {
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
    }
};

class Info extends React.Component {
    render() {
        let data = this.props.data;
        let type = this.props.type;
        let timeData = null;
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
    }
};

class Tab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentData: [],
            isLoad: 0
        };
    }
    componentDidMount() {
        let that = this;
        $$("#goods_details_desc").on("show", e => {
            e.stopPropagation();
        });
        $$("#goods_details_comment").on("show", e => {
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
    render() {
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
    }
};

class Desc extends React.Component {
    render() {
        return (
            <div className="desc-content">
                这里是详情内容
            </div>
        );
    }
};

class Comment extends React.Component {
    render() {
        let dataList = this.props.data.map((data, index) => {
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
            </div>
        );
    }
};

module.exports = {
    navbar: `<div class="left">
            <a href="#" class="back link"><i class="icon icon-back"></i><span>返回</span></a>
            </div>
            <div class="center sliding">商品详情</div>
            <div class="right"></div>
            `,
    pageContent: PageContent,
    pageClass: 'toolbar-through',
    pageFooter: `
                <div id="goods_details_footer" class="toolbar tabbar tabbar-labels row footer-bar-btn-list no-gutter">
                    <div id="collect" class="col-20 goods-collect">
                    <i class="fa fa-star-o"></i>
                    <div>收藏</div>
                    </div>
                    <div id="join_cart" class="col-40 blue-btn">
                    加入预购篮
                    </div>
                    <div id="buy" class="col-40 orange-btn">
                    立即预购
                    </div>
                </div>
                `
};