require('file?name=fonts/fontawesome-webfont.eot!font-awesome/fonts/fontawesome-webfont.eot');
require('file?name=fonts/fontawesome-webfont.svg!font-awesome/fonts/fontawesome-webfont.svg');
require('file?name=fontawesome-webfont.ttf!font-awesome/fonts/fontawesome-webfont.ttf');
require('file?name=fonts/fontawesome-webfont.woff!font-awesome/fonts/fontawesome-webfont.woff');
require('file?name=fonts/fontawesome-webfont.woff2!font-awesome/fonts/fontawesome-webfont.woff2');

require('!style!css!sass!./scss/main.scss');

var $ = require('jquery');
$('body').append(require('jade!./template/index.jade')());
$('body').css({'background-image': `url(${require("file!./img/splash.png")})`});

var Remote = require('./js/xbmc-init');
var remote = new Remote();
$('i.fa').click((e) => {
  remote.rpcCall($(e.target).data('method'));
});