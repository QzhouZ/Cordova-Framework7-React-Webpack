import "style/cate.less";
import Unit from 'libs/unit';
import BaseModule from './baseModule';

class PageContent extends BaseModule {
    constructor(props) {
        super(props);
        this.state = {
            active: 0,
            data: [],
            subData: []
        };
    }
    switch(index, id) {
        // 如果是当前的，点击就不再请求了
        if (this.state.active == index) {
            return;
        }
        this.setState({
            active: index,
            subData: []
        });
        this.getSubData(id);
    }
    getSubData(id) {
        Unit.ajax({
            api: 'sub_cate.json',
            params: {
                id: id
            }
        }, ret => {
            this.setState({
                subData: ret.data
            });
        });
    }
    toRender () {
        var dataList = this.state.data.map((data, index) => {
            var className = '';
            if (this.state.active == index) {
                className = 'active';
            }
            return (
                <li className={className} onClick={this.switch.bind(this, index, data.id)} key={index}>{data.name}</li>
            );
        });

        return (
            <div className="cate-content flex">
                <div className="cate-list">
                    <ul>
                        {dataList}
                    </ul>
                </div>
                <SubCate data={this.state.subData} />
            </div>
        );
    }
    componentDidMount() {
        Unit.ajax({
            api: 'cate.json'
        }, ret => {
            var dataList = ret.data;
            this.setState({
                data: dataList
            });
            this.getSubData(dataList[0].id);
        });
    }
};

class SubCate extends React.Component {
    render () {
        var dataList = this.props.data.map((data, index) => {
            var child = data.children.map((data, index) => {
                return (
                    <a href="#" key={index} data-page="goodsList">{data.name}</a>
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
};


module.exports = {
    pageContent: PageContent
};


