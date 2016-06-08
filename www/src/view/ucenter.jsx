import "style/ucenter.less";
import Unit from 'libs/unit';

class PageContent extends React.Component {
    render() {
        return (
            <div className="page-content">
                <div className="ucenter-top">
                    <div className="avatar">
                        <img src={require('img/avatar.png')} />
                        <div className="loin-info">
                            <a href="#">登录／注册</a>
                        </div>
                    </div>
                    <div className="sub-box flex">
                        <a className="collect flex flex-col-center flex-center" href="#">
                            <div>
                                <img src={require('img/star.png')} />
                            </div>
                            <div className="text">
                                <p className="tc">16</p>
                                <p>我的收藏</p>
                            </div>
                        </a>
                        <a className="footmark flex flex-col-center flex-center" href="#">
                            <div>
                                <img src={require('img/footer.png')} />
                            </div>
                            <div className="text">
                                <p className="tc">32</p>
                                <p>我的足迹</p>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="list-block order-content">
                    <ul>
                        <li>
                            <a href="#" className="item-link item-content">
                                <div className="item-media">
                                    <i className="icon-c icon-order"></i>
                                </div>
                                <div className="item-inner">
                                    <div className="item-title">全部订单</div>
                                    <div className="item-after">查看全部预购订单</div>
                                </div>
                            </a>
                        </li>
                        <li className="flex order-list">
                            <a className="item" href="#">
                                <img src={require('img/dps.png')} />
                                <span className="badge position-badge">1</span>
                            </a>
                            <a className="item" href="#">
                                <img src={require('img/dsh.png')} />
                            </a>
                            <a className="item dpj" href="#">
                                <img src={require('img/dpj.png')} />
                            </a>
                            <a className="item th" href="#">
                                <img src={require('img/th.png')} />
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="list-block">
                    <ul>
                        <li>
                            <a href="#" className="item-link item-content">
                                <div className="item-media">
                                    <i className="icon-c icon-location"></i>
                                </div>
                                <div className="item-inner">
                                    <div className="item-title">收获地址管理</div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="item-link item-content">
                                <div className="item-media">
                                    <i className="icon-c icon-user"></i>
                                </div>
                                <div className="item-inner">
                                    <div className="item-title">个人信息管理</div>
                                    <div className="item-after">请完善您的个人资料</div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="item-link item-content">
                                <div className="item-media">
                                    <i className="icon-c icon-lock"></i>
                                </div>
                                <div className="item-inner">
                                    <div className="item-title">密码变更</div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="item-link item-content">
                                <div className="item-media">
                                    <i className="icon-c icon-mobile"></i>
                                </div>
                                <div className="item-inner">
                                    <div className="item-title">绑定手机变更</div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="list-block">
                    <ul>
                        <li>
                            <a href="#" className="item-link item-content">
                                <div className="item-media">
                                    <i className="icon-c icon-message"></i>
                                </div>
                                <div className="item-inner">
                                    <div className="item-title">消息</div>
                                    <div className="item-after">查看历史消息</div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
};


module.exports = {
    pageContent: PageContent
};


