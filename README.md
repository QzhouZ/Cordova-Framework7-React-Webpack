# 介绍
基于Cordova + Framework7 + React + Webpack构建混合app，支持React代码热加载

[Framework7中文官网](http://f7cn.com/)      
[React中文官网](http://reactjs.cn/)

# 开发说明
 
## 目录结构说明

```

│ www 静态资源文件，用于cordova打包
        ├─data<—————测试数据相关文件
        ├─fonts<—————字体文件
        ├─img<—————图片
        ├─build<—————编译后的js文件
        ├─lib<—————第三方不适合编译的库
        ├─view<—————页面文件
        ├─app.less<—————页面样式(less)入口文件
        ├─index.html<起始页面
        └─src 源文件
           ├─less<—————less库
           ├─lib<—————可以编译的第三方库
           ├─view<—————react页面组件
           ├─app.less<—————入口css文件
           └─app.js<—————入口js文件

```

## 开发环境

安装Node和NPM，新版本NODE已经继承NPM   
安装Cordova [http://cordova.apache.org/](http://cordova.apache.org/)  
安装Webpack ``npm install webpack -g``  [http://webpack.github.io/](http://webpack.github.io/)  
安装Babel ``npm install --global babel-cli``

## 安装npm插件
``npm install``

## 开启开发服务
``npm start``，开启服务

然后在浏览器地址输入``http://127.0.0.1:3000/www/index.html``即可预览项目

## 相关命令

- ``npm run test``真机同步测试，只支持Android，需要连上Android手机
- ``npm run android``Android打包
- ``npm run ios``IOS打包


