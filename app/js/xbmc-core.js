/*
 *      Copyright (C) 2005-2013 Team XBMC
 *      http://xbmc.org
 *
 *  This Program is free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2, or (at your option)
 *  any later version.
 *
 *  This Program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with XBMC; see the file COPYING.  If not, see
 *  <http://www.gnu.org/licenses/>.
 *
 */

'use strict';

var $ = require('jquery');

var xbmc = {};

xbmc.rpc = {
    'default_options': {
        'contentType': 'application/json',
        'dataType': 'json',
        'type': 'POST',
        'success': function() {
            $('#spinner').hide();
        }
    },
    'request': function(options) {
        var request_options = $.extend({}, this.default_options, options);
        request_options.url = '/' + xbmc.core.JSON_RPC + '?' + options.method;
        request_options.method = 'POST';
        request_options.data = JSON.stringify({
            'jsonrpc': '2.0',
            'method': options.method,
            'id': 1,
            'params': request_options.params
        });
        return $.ajax(request_options)
    }
};
xbmc.core = {
    'DEFAULT_ALBUM_COVER': 'images/DefaultAlbumCover.png',
    'DEFAULT_VIDEO_COVER': 'images/DefaultVideo.png',
    'JSON_RPC': 'jsonrpc',
    'applyDeviceFixes': function() {
        window.document.addEventListener('touchmove', function(e) {
            e.preventDefault();
        });
    },
    'init': function() {
        xbmc.rpc.request({
            'context': this,
            'method': 'Player.GetActivePlayers',
            'timeout': 3000,
            'success': function(data) {
                if (data && data.result && data.result.length > 0) {
                    xbmc.activePlayerId = data.result[0].playerid;
                }
            },
            'error': function(data, error) {
                xbmc.core.displayCommunicationError();
            }
        });
    },
    'displayCommunicationError': function(m) {
        window.clearTimeout(xbmc.core.commsErrorTimeout);
        var message = m || 'Connection to server lost';
        $('#commsErrorPanel').html(message).show();
        xbmc.core.commsErrorTimeout = window.setTimeout('xbmc.core.hideCommunicationError()', 5000);
    },
    'durationToString': function(duration) {
        var total_seconds = duration || 0,
            seconds = total_seconds % 60,
            minutes = Math.floor(total_seconds / 60) % 60,
            hours = Math.floor(total_seconds / 3600),
            result = ((hours > 0 && ((hours < 10 ? '0' : '') + hours + ':')) || '');
        result += (minutes < 10 ? '0' : '') + minutes + ':';
        result += (seconds < 10 ? '0' : '') + seconds;
        return result;
    },
    'getCookie': function(name) {
        var i,
            match,
            haystack = window.document.cookie.split(';');
        for (i = 0; i < haystack.length; i += 1) {
            match = haystack[i].match(/^\s*[\S\s]*=([\s\S]*)\s*$/);
            if (match && match.length === 2) {
                return match[1];
            }
        }
        return null;
    },
    'hideCommunicationError': function() {
        $('#commsErrorPanel').hide();
    },
    'setCookie': function(name, value, days) {
        var date,
            expires;
        if (name) {
            if (days) {
                date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toGMTString();
            } else {
                expires = '';
            }
            window.document.cookie = name + "=" + value + expires + "; path=/";
        }
    },
    'timeToDuration': function(time) {
        var duration;
        time = time || {};
        duration = ((time.hours || 0) * 3600);
        duration += ((time.minutes || 0) * 60);
        duration += (time.seconds || 0);
        return duration;
    }
};

module.exports = xbmc;
