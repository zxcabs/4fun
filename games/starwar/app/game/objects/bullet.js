/**
 * @author "Evgeny Reznichenko" <kusakyky@gmail.com>
 */

var
    BaseObject = require('game/objects/base');


module.exports = SimpleBullet;

function SimpleBullet(p, opt) {
    opt = opt || {};

    BaseObject.call(this, p, opt);

    this.velocity.normalize().mult(5);

    this.livetime = 1.0;
    this.size = [10, 10];

    //чья пуля
    this.ship = opt.ship || null;
}

SimpleBullet.prototype = Object.create(BaseObject.prototype);
SimpleBullet.prototype.constructor = SimpleBullet;

SimpleBullet.prototype._move = SimpleBullet.prototype.move;
SimpleBullet.prototype.move = function move(p, dt, vdt) {
    this.livetime -= dt;

    if (this.livetime < 0) {
        this.isDead = true;
    } else {
        this._move(p, dt, vdt);
    }
};
