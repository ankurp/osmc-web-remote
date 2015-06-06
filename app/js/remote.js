'use strict'

var xbmc = require('./xbmc-core');
var $ = require('jquery');
xbmc.core.init();
xbmc.core.applyDeviceFixes();

class Remote {
  constructor($el) {
    $el.click((e) => {
      var method = $(e.target).data('method');
      switch (method) {
      case 'Player.SetSpeedInc':
        this.rpcCall('Player.SetSpeed', {'speed': 'increment'});
        break;
      case 'Player.SetSpeedDec':
        this.rpcCall('Player.SetSpeed', {'speed': 'decrement'});
        break;
      case 'Player.PlayPause':
        this.rpcCall('Player.PlayPause', {});
        break;
      default:
        this.rpcCall(method);
      }
    });
  }
  rpcCall(method, params) {
      var callObj = {
          'method': method
      };
      if (typeof params !== 'undefined') {
          params.playerid = xbmc.activePlayerId || -1;
          callObj.params = params;
      }
      console.log(callObj);
      return xbmc.rpc.request(callObj);
  }
}

module.exports = Remote;