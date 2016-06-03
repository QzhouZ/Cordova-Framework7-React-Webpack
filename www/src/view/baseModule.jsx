
export default class BaseModule extends React.Component {
    renderError() {
        return (
            <div className="no-data">{this.state.noDataMsg || '没有相关数据'}</div>
        );
    }
    componentDidMount() {
        let contentDom = $$(mainView.activePage.container).find('.page-content');
        // 下拉刷新
        if (this.state.pullToRefresh) {
            contentDom.addClass('pull-to-refresh-content');
            F7.initPullToRefresh(contentDom);
            contentDom.on('refresh', e => {
                this.fetch();
            });
        }
        // 无限滚动
        if (this.state.infiniteScroll) {
            contentDom.addClass('infinite-scroll');
            F7.attachInfiniteScroll(contentDom);
        }
        this.toComponentDidMount(contentDom);
    }
    render() {
        let renderComponent;
        if (!this.state.data) {
            renderComponent = null;
        } else {
            if (this.state.data instanceof Array && !this.state.data.length) {
                renderComponent = this.renderError();
            } else {
                renderComponent = this.toRender();
            }
        }
        return (
            <div className="page-content">
                <div className="pull-to-refresh-layer">
                    <div className="preloader"></div>
                    <div className="pull-to-refresh-arrow"></div>
                </div>
                {renderComponent}
            </div>
        )
    }
};

