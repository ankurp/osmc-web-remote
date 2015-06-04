'use strict'

var xbmc = require('./xbmc-core');
xbmc.core.init();
xbmc.core.applyDeviceFixes();

class Remote {
  constructor() {

  }
  rpcCall(method, params) {
      var callObj = {
          'method': method
      };
      if (typeof params !== 'undefined') {
          params.playerid = xbmc.activePlayerId || -1;
          callObj.params = params;
      }
      return xbmc.rpc.request(callObj);
  }
}

module.exports = Remote;