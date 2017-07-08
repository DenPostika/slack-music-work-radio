var slackTerminal = require('slack-terminalize');

var express = require('express');
var app = express();

var server = app.listen(8080);
var io = require('socket.io').listen(server);
var gm = require('locutus/php/datetime/date');

slackTerminal.init('xoxb-210718922887-udsntUzElcJJcBh4R4Ma2hsR', {
    // slack rtm client options here
    // more info at: https://github.com/slackhq/node-slack-client/blob/master/lib/clients/rtm/client.js
}, {
    // app configurations to suit your project structure
    // to see the list of all possible config,
    // check this out: https://github.com/ggauravr/slack-terminalize/blob/master/util/config.js
	CONFIG_DIR: __dirname + '/config',
	COMMAND_DIR: __dirname + '/commands'
});

app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/channel', function(req, res, next) {
    var cache_expire = 60*60*24*365;
    var date = new Date();

    res.set({
        'Pragma': 'public',
        'Cache-Control': 'maxage=' + cache_expire,
        'Expires': gm.date('D, d M Y H:i:s', date.getTime() + cache_expire) + ' GMT'
    })

    res.sendFile(__dirname + '/chanel.html');
});

exports.io = function () {
    return io;
};
