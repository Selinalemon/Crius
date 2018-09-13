const webpack = require('webpack');
const config = require('./package.json');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const EssayWebpackUpload = require('essay-webpack-upload');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const htmlwebpackincludeassetsplugin = require('html-webpack-include-assets-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const webpackConfig = module.exports = {};
const isProduction = process.env.NODE_ENV === 'production';
const isUpload = process.env.NODE_ENV === 'upload';
const isSprite = process.env.NODE_ENV === 'sprite';

const curDate = new Date();
const curTime = curDate.getFullYear() + '/' + (curDate.getMonth() + 1) + '/' + curDate.getDate() + ' ' + curDate.getHours() + ':' + curDate.getMinutes() + ':' + curDate.getSeconds();

const bannerTxt = config.name + ' ' + config.version + ' ' + curTime; //构建出的文件顶部banner(注释)内容

webpackConfig.entry = {
    /*vender: [
        'babel-polyfill',
        'classnames',
        'react',
        'react-dom',
        'axios',
        'react-router',
        'react-router-dom'
    ],*/
    app: './src/app.jsx'
};

webpackConfig.output = {
    path: path.resolve(__dirname, 'build/' + config.ftpTarget + '/' + config.version),
    publicPath: config.publicPath + '/' + config.version + '/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].js'
};

webpackConfig.resolve = {
    extensions: ['.js', '.jsx']
},
webpackConfig.module = {
    rules: [{
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ['css-loader?-autoprefixer', {
                loader: 'postcss-loader',
                options: {
                    config: {
                        path: path.resolve(__dirname, 'postcss.config.js')
                    }
                }
            }]
        }),
    }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader?-autoprefixer',
                {
                    loader: 'postcss-loader',
                    options: {
                        config: {
                            path: path.resolve(__dirname, 'postcss.config.js')
                        }
                    }
                },
                'sass-loader',
                {
                  loader: 'sass-resources-loader',
                  options: {
                    // Provide path to the file with resources
                    resources: './src/assets/css/_common.scss'
                    //resources: ['./path/to/vars.scss', './path/to/mixins.scss']
                  },
                }
            ]
        })
    }, {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'babel-loader'
            }
        ]
    }, {
        test: /\.(png|jpg|gif|webp)$/,
        loader: 'url-loader',
        options: {
            limit: 3000,
            name: 'assets/i/[name].[ext]',
        }
    }]
};

webpackConfig.plugins = [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CleanWebpackPlugin('build'),
    new HtmlWebpackPlugin({
        template: './src/index.html'
    }),
    new ExtractTextPlugin({
        filename: 'assets/css/app.css'
    }),
    new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css\.*(?!.*map)$/g,
        cssProcessorOptions: {
            discardComments:{removeAll:true},
            safe: true,
            autoprefixer:false,
        },
    }),
    new CopyWebpackPlugin([
        { from: path.join(__dirname, "./static/"), to: path.join(__dirname, './build/'+ config.ftpTarget + '/lib') }
    ]),
    new webpack.DllReferencePlugin({
        context:__dirname,
        manifest:require('./vender-manifest.json')
    })/*,
    new webpack.optimize.CommonsChunkPlugin({
        name: "vender",
        minChunks: Infinity
    })*/
];
// 自动生成雪碧图功能
if (isSprite) {
    const SpritesmithPluginCreat = new SpritesmithPlugin({
        // 目标小图标
        src: {
            cwd: path.resolve(__dirname, 'src/assets/sprite'),
            glob: '*.png'
        },
        // 输出雪碧图文件及样式文件
        target: {
            image: path.resolve(__dirname, 'src/assets/i/sprite.png'),
            css: path.resolve(__dirname, 'src/assets/css/_sprite.scss')
        },
        // 样式文件中调用雪碧图地址写法
        apiOptions: {
            cssImageRef: '../i/sprite.png'
        },
        //图片排列方式
        spritesmithOptions: {
            //上下 top-down、左右、left-right
            algorithm: 'top-down',
            padding: 20,
            margin: 20
        }
    });
    webpackConfig.plugins.push(SpritesmithPluginCreat)

}

if (isProduction || isUpload) {
    //webpackConfig.devtool = '#cheap-module-source-map';
    webpackConfig.devtool = false;
    webpackConfig.plugins = (webpackConfig.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new UglifyJsPlugin({
            cache:true,
            sourceMap:false,
            parallel:4,
            uglifyOptions: {
                ecma:8,
                warnings:false,
                compress:{
                    drop_console:true,
                },
                output:{
                    comments:false,
                    beautify:false,
                }
            }
        }),
        new htmlwebpackincludeassetsplugin({
            assets:['/lib/vender.dll.js'],
            publicPath:config.publicPath,
            append:false
        }),
        new webpack.BannerPlugin(bannerTxt)
    ]);
    if(isProduction) {
        webpackConfig.plugins = (webpackConfig.plugins || []).concat([
            // 执行npm run build时查看代码大小
            new BundleAnalyzerPlugin()
        ]);
    }
    if (isUpload) {
        webpackConfig.plugins = (webpackConfig.plugins || []).concat([
            new EssayWebpackUpload({
                host: '192.168.181.73',
                port: '3000',
                source: 'build',
                cdnDir: config.ftpServer,
                previewDir: config.previewDir
            })
        ]);
    }
} else {
    webpackConfig.output.publicPath = '/';
    webpackConfig.devtool = '#cheap-module-eval-source-map';
     webpackConfig.plugins = (webpackConfig.plugins || []).concat([
         new AddAssetHtmlPlugin({
            filepath:require.resolve('./static/vender.dll.js'),
            includeSourcemap:false,

        })
    ]);
    webpackConfig.devServer = {
        disableHostCheck: true,
        contentBase: path.resolve(__dirname, 'build'),
        compress: true, //gzip压缩
        historyApiFallback: true
    };
}