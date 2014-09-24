/**
 * @author "Evgeny Reznichenko" <kusakyky@gmail.com>
 */

var
    initPromise;

Promise
    .all([
        require.bundle('bundle-game'),
        require.bundle('bundle-vendors')
    ])
    .then(function() {
        return Promise.resolve();
    })
    .then(function (c) {

        var
            Game = require('game/index'),
            game = new Game();

        game.addPlayer();
    })
    .catch(function (e) {
        console.error(e);
    });