require('file?name=fontawesome-webfont.eot!font-awesome/fonts/fontawesome-webfont.eot');
require('file?name=fontawesome-webfont.svg!font-awesome/fonts/fontawesome-webfont.svg');
require('file?name=fontawesome-webfont.ttf!font-awesome/fonts/fontawesome-webfont.ttf');
require('file?name=fontawesome-webfont.woff!font-awesome/fonts/fontawesome-webfont.woff');
require('file?name=fontawesome-webfont.woff2!font-awesome/fonts/fontawesome-webfont.woff2');
require('file?name=addon.xml!./addon.xml');
require('!style!css!sass!./scss/main.scss');
require('./js/ripple');
var $ = require('jquery');
$('body').append(require('jade!./template/index.jade')());
$('body').css({'background-image': `url(${require("url!./img/splash.jpg")})`});

var Remote = require('./js/remote');
var remote = new Remote($('i.fa'));
