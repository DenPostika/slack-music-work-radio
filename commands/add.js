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
                util.postMessage(channel, "Заявку принял на *<"+result.data[0].link+"|" + result.data[0].artist.name + " - " + result.data[0].title + ">* :musical_note:", false);
            } else {
                util.postMessage(channel, "Заявку то я принял, но играть негде :white_frowning_face:", false);
            }
        } else {
            util.postMessage(channel, "Мне не удалось ничего найти чувак :white_frowning_face:", false);
        }
    });
};