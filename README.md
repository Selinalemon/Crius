## webpack-react-spa

> 基于webpack的react单页面应用通用脚手架 1.0

### 如何开始新的项目
##### 1.clone本项目到本地
##### 2.修改package.json

根据自己项目情况填写：

字段名 | 备注
---|---
name | 项目名称
version | 项目版本号
description | 项目描述
main | 入口文件
publicPath | 静态资源目录
ftpServer | 静态文件服务器
ftpTarget | 静态文件目录
previewDir | 项目浏览服务器
author | 作者信息

##### 3.修改README.md
##### 4.npm install 安装依赖

### 开发流程
#### 开发
进入开发模式（类似于 jdf b -o）

npm run dev

#### 自动生成雪碧图
执行命令之前，在css/sprite 中加入需要生成雪碧图的icon

npm run sprite
#### 构建
构建开发/线上环境的代码到build目录，执行该命令时会自动调用代码分析功能，查看各模块代码占比情况

npm run build

#### 上传
上传到73环境

npm run upload

脚手架功能点：
1、支持代码压缩与抽取，打包后的代码分为公共依赖库和业务逻辑两类；
2、支持去除打包后代码中的注释等信息；
3、支持打包后代码中插入时间戳；
4、支持react-router + bundle-loader 的按需加载功能；
5、支持scss；
6、支持rem；
7、支持autoprefixer；
8、支持@mixin、%、变量定义的公共scss一次引入，可以实现全局使用；
9、内嵌axios HTTP库；
10、支持ES6语法，且已安装babel-polyfill，用来兼容低端浏览器（如部分华为手机自带浏览器）；
11、支持图片降质、支持小图片转 base64。
12、支持文件上传至page和static/misc服务器，使用 essay-webpack-upload  组件，上传服务器路径可配置；
13、支持devServer本地调试、热更新；
14、内嵌BundleAnalyzerPlugin组件，npm run build 时可查看js文件占比大小；
15、支持自动生成雪碧图和相应scss文件；
16、页面Viewport标签的content属性内含“viewport-fit:cover”，便于适配iPhone X。

使用注意事项：
1、该脚手架中默认安装的是 react v16、react-router v4，请注意编码方法与之前版本的差异；
2、使用本脚手架需要有react的基础，了解react-router(https://www.sitepoint.com/react-router-v4-complete-guide/)使用；
3、组件导出时使用 export default withRouter(组件名)，这样组件内都可以获取路由信息；
4、当js/jsx文件里需要引用i里的icon时，使用引入组件的方式。例如，import Banner from './../../assets/i/a.png'；
5、如果项目中的依赖文件已使用懒加载功能（比如引用了某个组件库，但是懒加载了仅需要的组件），则该文件不要放到vender中，否则会全部加载；
6、当使用npm run sprite自动生成雪碧图时，提前将需要生成雪碧图的icon放入css/sprite的文件夹内，会自动生成雪碧图和相应的scss文件，雪碧图sprite.png自动插入i/，_sprite.scss自动放入css/；
7、如果有多个@mixin、%、变量定义的公共的scss文件，需要手动添加 webpack.config.js -> sass-resources-loader -> resources，一次引入可以实现全局使用；
8、postcss.config.js 里的 browsers 默认配置是兼容手机端各大浏览器，如果是在PC端使用，请根据项目需求进行修改。

*   [react-router 4.0 官网](https://www.sitepoint.com/react-router-v4-complete-guide/)
