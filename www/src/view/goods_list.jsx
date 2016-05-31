var Unit = require('libs/unit');

var PageContent = React.createClass({
    getInitialState: function() {
        return {
            reload: 0
        }
    },
    closeModal: function() {
        this.setState({
            reload: 1
        });
        $$('.modal-overlay-c,.modal-content-custom').removeClass('modal-in');
    },
    componentDidMount: function() {
        console.log(this.props.query);
    },
    render: function() {
        return (
            <div className="page-content goods-content">
                <Goods reload={this.state.reload} />
            </div>
        );
    }
});

var Goods = React.createClass({
    getInitialState: function() {
        return {
            data: [],
            viewList: 1
        }
    },
    getData: function() {
        var that = this;
        var cateId = $$("#goods_cate").attr('data-cateid');
        var subCateId = $$("#goods_cate").attr('data-subcateid');
        var sortType = $$("#goods_sort").attr('data-sort');
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
    },
    render: function() {
        var dataList = this.state.data.map(function(data, index) {
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
                    <div className="cart">
                        <img src="img/cart_red.png" alt=""/>
                    </div>
                </li>
            );
        });
        var className = 'goods-list-1';
        if (this.state.viewList == 1) {
            className = 'goods-list-1';
        } else {
            className = 'goods-list-2';
        }
        return (
            <div className={className}>
                <ul className="bd">
                    {dataList}
                </ul>
            </div>
        );
    },
    componentDidMount: function() {
        var that = this;
        this.getData();
        $$('#goods_list_view').on('click', function() {
            var list = $$(this).attr('data-list');
            var src = '';
            if (list == 1) {
                src = 'img/two_list.png';
                list = 2;
            } else {
                src = 'img/one_list.png';
                list = 1;
            }
            $$(this).attr('data-list', list);
            $$(this).find('img').attr('src', src);
            that.setState({
                viewList: list
            });
        });
    },
    componentWillReceiveProps: function(nextProps) {
        if (nextProps.reload) {
            this.getData();
        }
    }
});





module.exports = {
    navbar: `<div class="left">
        <a href="#" class="back link"><i class="icon icon-back"></i><span>返回</span></a>
        </div>
        <div class="center sliding">商品列表</div>`,
    content: PageContent
};


