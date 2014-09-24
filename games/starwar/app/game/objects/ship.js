/**
 * @author "Evgeny Reznichenko" <kusakyky@gmail.com>
 */


var
    BaseObject = require('game/objects/base'),
    SimpleBullet = require('game/objects/bullet'),
    SimpleMissile = require('game/objects/missile');


module.exports = BaseShip;

function BaseShip(p, opt) {
    opt = opt || {};

    BaseObject.call(this, p, opt);

    this.size = opt.size || 40;

    this.maxAcceliration = 0.3;
    this.maxVelocity = 3;
}

BaseShip.prototype = Object.create(BaseObject.prototype);
BaseShip.prototype.constructor = BaseShip;

BaseShip.prototype.draw = function draw(p, dt) {
    var
        theta = this.velocity.heading();

    p.fill(127);
    p.stroke(200);
    p.push();
    p.translate(this.position.x, this.position.y);
    p.rotate(theta);
    p.beginShape();
    p.vertex(this.size, 0);
    p.vertex(-this.size / 2, this.size / 2);
    p.vertex(-this.size / 2, -this.size / 2);
    p.endShape(p.CLOSE);
    p.pop();
};


BaseShip.prototype.simpleFire = function simpleFire(p5) {
    return new SimpleBullet(p5,  {
        x: this.position.x,
        y: this.position.y,
        dx: this.velocity.x,
        dy: this.velocity.y,
        ship: this
    });
};

BaseShip.prototype.missileFire = function missileFire(p5) {
    return new SimpleBullet(p5,  {
        x: this.position.x,
        y: this.position.y,
        dx: this.velocity.x,
        dy: this.velocity.y,
        ship: this
    });
};