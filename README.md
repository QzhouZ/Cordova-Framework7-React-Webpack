# 介绍
基于Cordova + Framework7 + React + Webpack构建混合app，支持React代码热加载

[Framework7中文官网](http://f7cn.com/)      
[react中文官网](http://reactjs.cn/)

# 开发说明
 
## 目录结构说明

```

│ www 静态资源文件，用于cordova打包
        ├─data<—————测试数据相关文件
        ├─fonts<—————字体文件
        ├─img<—————图片
        ├─js<—————编译后的js文件
        ├─lib<—————第三方不适合编译的库
        ├─view<—————页面文件
        ├─app.less<—————页面样式(less)入口文件
        └─index.html<起始页面
│ www_src 源文件
        ├─less<—————less库
        ├─lib<—————可以编译的第三方库
        ├─view<—————react页面组件
        ├─view_less<—————页面样式(less)文件
        └─app.js<—————入口文件

```

## 开发环境
需要安装Cordova和npm环境

## 安装npm插件
``npm install``

## 开启开发服务
``npm start``，开启服务

然后在浏览器地址输入``http://127.0.0.1:3000/www/index.html``即可预览项目

## 真机同步测试
``npm build``，需要连上安卓手机

## app发布
``npm release``，会将所有js代码压缩，重新打包成apk，输出的目录就是cordova打包的目录

## 优化计划
- [ ] 以后会将webpack和gulp整合，更合理的配置文件目录结构，毕竟只用webpack还是有局限的。

