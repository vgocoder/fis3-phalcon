//vi fis3-phalcon/index.js
var fis = module.exports = require('fis3');

fis.require.prefixes.unshift('fis3-phalcon');
fis.cli.name = 'fis3-phalcon';
fis.cli.info = require('./package.json');

fis.match('*', {
    release: '/public/$0' // 所有资源发布时产出到 /public 目录下
});

fis.match('*.volt', {
    release: '/app/views/$0' // 所有 PHP 模板产出后放到 /app/views 目录下
});

// 所有js, css 加 hash
fis.match('*.{js,css,less}', {
    useHash: true
});

// 所有图片加 hash
fis.match('image', {
    useHash: true
});

// fis-parser-less
fis.match('*.less', {
    parser: fis.plugin('less'),
    rExt: '.css'
});

fis.match('*.js', {
    optimizer: fis.plugin('uglify-js')
});

fis.match('*.{css,less}', {
    optimizer: fis.plugin('clean-css')
});

fis.match('*.png', {
    optimizer: fis.plugin('png-compressor')
});

fis.match('widget/*.{php,js,css}', {
    isMod: true
});

fis.match('::package', {
    spriter: fis.plugin('csssprites')
});

//fis3-hook-module
fis.hook('module', {
  mode: 'auto' // 模块化支持,程序自动判断
});