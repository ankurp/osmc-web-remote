require('!style!css!sass!./scss/main.scss');

require('./js/xbmc-init');

var $ = require('jquery');
var html = require('jade!./template/index.jade')();
var bgImgURL = require("file!./img/splash.png");

$('body').append(html);
$('body').css({'background-image': 'url(' + bgImgURL + ')'});