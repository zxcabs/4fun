/**
 * @author "Evgeny Reznichenko" <kusakyky@gmail.com>
 */


var
    BaseObject = require('game/objects/base');

module.exports = SimpleMissile;


function SimpleMissile(p, opt) {
    opt = opt || {};

    BaseObject.call(this, p, opt);

    this.velocity.normalize().mult(10);


    this.size = [15, 15];

    //чья ракета
    this.ship = opt.ship || null;
}

SimpleMissile.prototype = Object.create(BaseObject.prototype);
SimpleMissile.prototype.constructor = SimpleMissile;

//SimpleMissile.prototype._move = SimpleMissile.prototype.move;
//SimpleMissile.prototype.move = function (p, dt, vdt) {
//    this._move();
//};