var Q = require('q');
var id = 'summit-view-uptime-robot';
var config, summit;

module.exports = function(s) {
    summit = s;

    // emit the profiles on new connection
    summit.io.on('connection', function() {
        var stuff = {};
        summit.io.emit('event', stuff);
    });

    return {
        id: id,
    };
};

module.exports.id = id;

module.exports.client = __dirname + '/lib/client.js';

module.exports.style = __dirname + '/public/style.css';

module.exports.onSettings = function(settings) {};
