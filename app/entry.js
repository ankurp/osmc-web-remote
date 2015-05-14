require('!style!css!sass!./scss/main.scss');

require('./js/xbmc-init');

var $ = require('jquery');
$('body').append(require('jade!./template/index.jade')());