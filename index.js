var Client = require('uptime-robot');

var id = 'summit-view-uptime-robot';
var config = {}, summit, client, monitors = [], timeout;

var scheduleUpdate = function() {
    var lowest = 300;

    for (var i = 0; i < monitors.length; i++) {
        var interval = ( monitors[i].interval && parseInt(monitors[i].interval) ) ? parseInt(monitors[i].interval) : 300;
        lowest = ( interval < lowest ) ? intervak : lowest;
    }

    timeout = setTimeout(updateMonitors, lowest * 1000);
};

var updateMonitors = function() {
    if( client ) {
        client.getMonitors()
            .then(function(ms) {
                monitors = ms;
                summit.io.emit('monitors', monitors);
                scheduleUpdate();
            });
    }
    else {
        monitors = [];
        summit.io.emit('monitors', monitors);
        clearTimeout(timeout);
    }
};


module.exports = function(s) {
    summit = s;

    // emit the profiles on new connection
    summit.io.on('connection', function() {
        summit.io.emit('monitors', monitors);
    });


    return summit.settings()
        .then(function(settings) {
            settings = settings || {};

            if( !config.apiKey ) {
                summit.registerSetting({
                    name: 'apikey',
                    label: 'API Key',
                    type: 'text',
                    value: settings.apikey || '',
                });
            }

            if( config.apiKey || settings.apikey ) {
                client = new Client( config.apiKey || settings.apikey );
                updateMonitors();
            }

            return {
                id: id,
            };
        });
};

module.exports.id = id;

module.exports.client = __dirname + '/lib/client.js';

module.exports.style = __dirname + '/public/style.css';

module.exports.onSettings = function(settings) {
    if( settings.apikey ) {
        client = new Client( settings.apikey );
    }
    else {
        client = false;
    }

    updateMonitors();
};

module.exports.init = function(cfg) {
    config = cfg;
    return module.exports;
};
