import "../style/goods_list.less";
import Unit from 'libs/unit';

class PageContent extends React.Component {
    render() {
        return (
            <div className="page-content goods-content">
                <Goods />
            </div>
        );
    }
};

class Goods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            viewList: 1
        };
    }
    addCart(goodsId, storeId) {
        Unit.toast('已成功加入预购篮!', 0, 1500);
    }
    getData() {
        let that = this;
        let cateId = $$("#goods_cate").attr('data-cateid');
        let subCateId = $$("#goods_cate").attr('data-subcateid');
        let sortType = $$("#goods_sort").attr('data-sort');
        Unit.ajax({
            api: 'new',
            params: {
                cateId: cateId,
                subCateId: subCateId,
                sortType: sortType
            }
        }, function(data) {
            if (data.status == 1) {
                that.setState({
                    data: data.data
                });
            }
        });
    }
    componentDidMount() {
        let that = this;
        this.getData();
        $$('#goods_list_view').on('click', function() {
            let list = $$(this).attr('data-list');
            let src = '';
            if (list == 1) {
                src = require('../img/two_list.png');
                list = 2;
            } else {
                src = require('../img/one_list.png');
                list = 1;
            }
            $$(this).attr('data-list', list);
            $$(this).find('img').attr('src', src);
            that.setState({
                viewList: list
            });
        });
    }
    render() {
        var that = this;
        let dataList = this.state.data.map((data, index) => {
            return (
                <li key={index}>
                    <a className="u-item-list" href="#"  data-page="goods_details" data-query="id=1">
                        <div className="thumb">
                            <img src={data.src} />
                        </div>
                        <div className="info">
                            <p>惠氏  钙尔奇  碳酸钙</p>
                            <p>D3片 600mg*60片 </p>
                            <p className="price">
                                <span className="old">¥4100.00</span>
                                <span className="new ml10">¥300.00</span>
                            </p>
                            <p className="company">生成企业：美国博士伦</p>
                        </div>
                    </a>
                    <div className="cart" onClick={that.addCart}>
                        <img src={require('../img/cart_red.png')} />
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
                <span id="goods_sort" class="item" data-type="sort"  data-sort="0">
                    <em>综合排序</em>
                    <i class="icon-caret"></i>
                </span>
                <span class="item-icon flex">
                    <a class="link" id="goods_list_view" data-list="1">
                        <img src="${require('../img/one_list.png')}"/>
                    </a>
                    <a class="link">
                        <img src="${require('../img/filter.png')}"/>
                    </a>
                </span>
            </div>
            `,
    pageContent: PageContent,
    pageClass: 'goods-navbar-fixed'
};


