import "style/goodsList.less";
import Unit from 'libs/unit';
import BaseModule from './baseModule';

class PageContent extends BaseModule {
    constructor(props) {
        super(props);
        this.state = {
            pullToRefresh: 1,
            data: null,
            noDataMsg: '没有找到相关数据'
        };
    }
    fetch() {
        Unit.ajax({
            api: 'goods.json'
        }, ret => {
            this.setState({
                data: ret.data
            });
        });
    }
    toComponentDidMount(contentDom) {
        F7.pullToRefreshTrigger(contentDom);
    }
    toRender() {
        return (
            <Goods data={this.state.data} />
        );
    }
};

class Goods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewList: 1
        };
    }
    addCart(goodsId, storeId) {
        Unit.toast('已成功加入预购篮!', 0, 1500);
    }
    componentDidMount() {
        $$('#goods_list_view').on('click', e => {
            let list = $$(e.currentTarget).attr('data-list');
            let src = '';
            if (list == 1) {
                src = require('img/two_list.png');
                list = 2;
            } else {
                src = require('img/one_list.png');
                list = 1;
            }
            $$(e.currentTarget).attr('data-list', list);
            $$(e.currentTarget).find('img').attr('src', src);
            this.setState({
                viewList: list
            });
        });
    }
    render() {
        let dataList = this.props.data.map((data, index) => {
            return (
                <li key={index}>
                    <a className="u-item-list" href="#"  data-page="goodsDetails" data-query="id=1">
                        <div className="thumb">
                            <img src={data.src} />
                        </div>
                        <div className="info">
                            <p>惠氏  钙尔奇  碳酸钙</p>
                            <p>D4片 600mg*60片 </p>
                            <p className="price">
                                <span className="new">¥ 300.00</span>
                            </p>
                            <p className="company">生成企业：美国博士伦</p>
                        </div>
                    </a>
                    <div className="cart" onClick={this.addCart}>
                        <img src={require('img/cart_red.png')} />
                    </div>
                </li>
            );
        });
        let className = 'goods-list-1';
        if (this.state.viewList != 1) {
            className = 'goods-list-2';
        }
        return (
            <div className={className}>
                <ul className="bd">
                    {dataList}
                </ul>
            </div>
        );
    }
};

module.exports = {
    navbar: `<div class="left">
            <a href="#" class="back link"><i class="icon icon-back"></i><span>返回</span></a>
            </div>
            <div class="center sliding">商品列表</div>
            <div class="right"></div>
            <div id="goods_filter_bar" class="subnavbar goods-sub-navBar">
                <span id="goods_cate" class="item flex flex-center flex-col-center" data-type="cate" data-cateid="0" data-subcateid="0">
                    <em class="ell cate">全部分类</em>
                    <i class="icon-caret"></i>
                </span>
                <span id="goods_sort" class="item">
                    <em>综合排序</em>
                    <i class="icon-caret"></i>
                </span>
                <span class="item-icon flex">
                    <a class="link" id="goods_list_view" data-list="1">
                        <img src="${require('img/one_list.png')}"/>
                    </a>
                    <a class="link">
                        <img src="${require('img/filter.png')}"/>
                    </a>
                </span>
            </div>
            `,
    pageContent: PageContent,
    pageClass: 'goods-navbar-fixed goods-page'
};


