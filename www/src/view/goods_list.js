'use strict';
var React = require('react');
var Unit = require('lib/unit');

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
    render: function() {
        return (
            <div className="goods-content">
                <Goods reload={this.state.reload} />
                <Filter closeModal={this.closeModal} />
                <div className="modal-overlay-c" onClick={this.closeModal}></div>
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
                    <a className="u-item-list" href="view/goods_details.html?id=1">
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

var Filter = React.createClass({
    getInitialState: function() {
        return {
            type: 0,
            subCateId: null,
            sortType: 0
        }
    },
    chooseFilterItem: function(name, type, value, value2) {
        if (type == 'cate') {
            this.setState({
                subCateId: value2
            });
            $$("#goods_cate").attr('data-cateid', value);
            $$("#goods_cate").attr('data-subcateid', value2);
        } else if (type == 'sort') {
            this.setState({
                sortType: value2
            });
            $$("#goods_sort").attr('data-sort', value);
        }
        $$('#goods_filter_bar .item[data-type='+type+']').find('em').text(name);
        this.props.closeModal();
    },
    render: function() {
        return (
            <div className="modal-content-custom">
                <CateList chooseFilterItem={this.chooseFilterItem} subCateId={this.state.subCateId} />
                <SortList chooseFilterItem={this.chooseFilterItem} type={this.state.sortType} />
            </div>
        );
    },
    componentDidMount: function() {
        var that = this;
        $$('#goods_filter_bar .item').on('click', function() {
            var index = $$(this).index();
            var type = $$(this).data('type');
            var className = $$('.modal-overlay-c').attr('class');
            var isOpen = /modal-in/.test(className);
            that.setState({
                type: type
            });
            if (!isOpen) {
                $$('.modal-overlay-c,.modal-content-custom').addClass('modal-in');
            }
            if (index == 0) {
                $$('.modal-cate-list').show();
                $$('.modal-filter-list').hide();
            } else {
                $$('.modal-cate-list').hide();
                $$('.modal-filter-list').show();
            }
        });
    }
});


var CateList = React.createClass({
    getInitialState: function() {
        return {
            active: 0,
            data: [],
            subData: []
        }
    },
    switch: function(index, id) {
        if (index == 0) {
            this.props.chooseFilterItem('全部分类', 'cate', 0, null);
            this.setState({
                active: index,
                subData: []
            });
            return;
        }
        // 如果是当前的，点击就不再请求了
        if (this.state.active == index) {
            return;
        }
        this.setState({
            active: index,
            subData: []
        });
        this.getSubData(id);
    },
    getSubData: function(id) {
        var that = this;
        Unit.ajax({
            api: 'sub_cate',
            params: {
                id: id
            }
        }, function(data) {
            if (data.status == 1) {
                that.setState({
                    subData: data.data
                });
            }
        });
    },
    render: function () {
        var that = this;
        var dataList = this.state.data.map(function(data, index) {
            var className = '';
            if (that.state.active == index) {
                className = 'active';
            }
            return (
                <li className={className} onClick={that.switch.bind(that, index, data.id)} key={index}>{data.name}</li>
            );
        });

        return (
            <div className="modal-cate-list cate-content flex">
                <div className="cate-list">
                    <ul>
                        {dataList}
                    </ul>
                </div>
                <SubCate data={this.state.subData} chooseFilterItem={this.props.chooseFilterItem} subCateId={this.props.subCateId}  />
            </div>
        );
    },
    componentDidMount: function() {
        var that = this;
        Unit.ajax({
            api: 'cate'
        }, function(data) {
            if (data.status == 1) {
                var dataList = data.data;
                dataList.unshift({
                    "id": 0,
                    "name": "全部分类"
                });
                that.setState({
                    data: dataList
                });
            }
        });
    }
});

var SubCate = React.createClass({
    getInitialState: function() {
        return {
            data: []
        }
    },
    render: function () {
        var that = this;
        var dataList = this.props.data.map(function(data, index) {
            var pId = data.id;
            var pName = data.name;
            var child = data.children.map(function(data, index) {
                var className = '';
                var cateName = data.name;
                if (that.props.subCateId == data.id) {
                    className = 'active';
                }
                if (data.id == 0) {
                    cateName = pName;
                }
                return (
                    <a className={className} onClick={that.props.chooseFilterItem.bind(null, cateName, 'cate', pId, data.id)} key={index}>{data.name}</a>
                );
            });
            return (
                <div className="item-box" key={index}>
                    <div className="hd">{data.name}</div>
                    <div className="bd">
                        {child}
                    </div>
                </div>
            );
        });
        return (
            <div className="cate-list-item">
                {dataList}
            </div>
        );
    }
});

var SortList = React.createClass({
    getInitialState: function() {
        return {
            data: ['综合排序','销量排序','价格升序','价格降序','最新发布']
        }
    },
    render: function() {
        var that = this;
        var dataList = this.state.data.map(function(data, index) {
            var isChecked = '';
            if (that.props.type == index) {
                isChecked = <i className="fa fa-check"></i>;
            }
            return (
                <li onClick={that.props.chooseFilterItem.bind(null,  data, 'sort', index)} key={index}>
                    {data}
                    {isChecked}
                </li>
            );
        });
        return (
            <ul className="modal-filter-list">
                {dataList}
            </ul>
        );
    }
});

module.exports = PageContent;


