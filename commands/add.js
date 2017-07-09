var request = require('request'),
    util = require('../util'),
    app = require('../index'),
    deezer = require('deezer-node-api');

var dz = new deezer();

module.exports = function (param) {
    var channel = param.channel;

    dz.findTracks(param.args.join(' ')).then(function (result) {
        if (result.data[0]) {
            if (app.io().engine.clientsCount) {
                app.io().sockets.emit('add', result.data[0].id);
                util.postMessage(channel, "Заявку принял на " + result.data[0].artist.name + " - " + result.data[0].title);
            } else {
                util.postMessage(channel, "Прости, заявку то я принял, но играть негде :с");
            }
        } else {
            util.postMessage(channel, "Мне не удалось ничего найти чувак :с");
        }
    });
};