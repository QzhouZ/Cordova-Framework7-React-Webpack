import "style/goodsDetails.less";
import Unit from 'libs/unit';
import BaseModule from './baseModule';

class PageContent extends BaseModule {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }
    fetch() {
        Unit.ajax({
            api: 'goods_info.json',
            loading: 1,
            params: {
                id: this.props.query.id
            }
        }, ret => {
            this.setState({
                data: ret.data
            });
        });
    }
    componentDidMount() {
        this.fetch();
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
	toRender() {
        let data = this.state.data;
        return (
            <div>
                <Slider data={data.slider} />
                <Info data={data.info} />
                <Tab  goodsId={this.props.query.id} />
            </div>
        );
    }
};

class Slider extends React.Component {
    componentDidMount() {
        F7.swiper('.goods-details-slider', {
            pagination : '.goods-slider-pagination'
        });
    }
    render() {
        let dataList = this.props.data.map((data, index) => {
            return (
                <div className="swiper-slide" key={index}>
                    <img src={data.src} />
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
        return (
            <div className="goods-details-info">
                <div className="name">{data.name}</div>
                <div className="price">
                    <span className="new">¥{data.price}</span>
                    <span className="old">¥{data.oldPrice}</span>
                    <span className="sells">{data.sellNumber}</span>
                </div>
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
            commentData: []
        };
    }
    fetch() {
        Unit.ajax({
            api: 'goods_comment.json',
            params: {

            }
        }, ret => {
            this.setState({
                commentData: ret.data
            });
        });
    }
    componentDidMount() {
        $$("#goods_details_desc").on("show", e => {
            e.stopPropagation();
        });
        $$("#goods_details_comment").on("show", e => {
            this.fetch();
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
                        <Comment data={this.state.commentData} />
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
    pageTitle: '商品详情',
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