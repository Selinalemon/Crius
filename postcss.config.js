module.exports = {
    plugins: [
        require('autoprefixer')({
        	// 该配置是兼容手机端各个浏览器
            browsers: ['> 3% in alt-AS', 'last 4 versions', 'Android >= 4', 'iOS >= 8', 'last 5 QQAndroid versions', 'last 5 UCAndroid versions']
            /** 如下是PC端浏览器兼容性处理，可以根据具体项目需求进行修改 **/
            // browsers: ['last 5 versions', 'ie >= 9']
        })
    ]
}