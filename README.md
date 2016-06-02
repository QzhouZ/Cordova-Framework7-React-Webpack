# 介绍
基于Cordova + Framework7 + React + Webpack构建混合app

[Framework7中文官网](http://f7cn.com/)      
[React中文官网](http://reactjs.cn/)

# 最新说明

2.0版本重新整理了目录结构，使用React-dom+ES6进行组件模块化开发,  
使用Framework7的穿透布局,单一HTML入口，其余页面通过React生成,  
Framework7相关js、css文件直接通过页面引入，不参与打包可以大大减少不必要的打包时间,  
目录下面有个app.apk文件，可以安装到安卓手机里体验一下。

# 开发说明
 
## 目录结构说明

```

│ www 资源文件，用于cordova打包
        ├─mock<—————测试数据
        ├─dist<—————编译后的js文件
        ├─libs<—————类库
        ├─index.html<—————起始页面
        └─src 开发目录
           ├─style<—————样式文件
           ├─img<—————图片
           ├─view<—————react页面组件
           ├─app.less<—————入口css文件
           └─app.jsx<—————入口js文件

```

## 开发环境

安装Node和NPM，新版本Node已经继承NPM   
安装Cordova [http://cordova.apache.org/](http://cordova.apache.org/)  
安装Webpack ``npm install webpack -g``  [http://webpack.github.io/](http://webpack.github.io/)  
安装Babel ``npm install --global babel-cli``

## 安装npm插件
``npm install``

## 开启开发服务
``npm run dev``，开启服务

然后在浏览器地址输入``http://127.0.0.1:3000/www/index.html``即可预览项目

## 相关命令

- ``npm run test`` 真机同步测试，只支持Android，需要连上Android手机
- ``npm run build `` 文件编译，压缩，合并，执行此命令后才可以进行下面两个任务
- ``npm run android`` Android打包
- ``npm run ios`` IOS打包


