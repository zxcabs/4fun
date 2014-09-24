/**
 * @author "Evgeny Reznichenko" <kusakyky@gmail.com>
 */


module.exports = BaseObject;

function BaseObject(p, opt) {
    opt = opt || {};

    this.position = p.createVector(opt.x || 0, opt.y || 0);
    this.velocity = p.createVector(opt.dx || 0, opt.dy || 0);
    this.acceleration = p.createVector(opt.dxx || 0, opt.dyy || 0);

    this.size = [20, 20];

    this.isDead = false;
}

BaseObject.prototype.updateAcceleration = function noop() {};

BaseObject.prototype.updateVelocity = function updateVelocity(p, dt, vdt) {
    this.velocity.add(this.acceleration.get().mult(dt));
};

BaseObject.prototype.updatePosition = function updatePosition(o, dt, vdt) {
    this.position.add(this.velocity);
};

BaseObject.prototype.move = function move(p, dt, vdt) {
    this.updateAcceleration(p, dt, vdt);

    if ('number' === typeof this.maxAcceliration) {
        this.acceleration.limit(this.maxAcceliration);
    }

    this.updateVelocity(p, dt, vdt);

    if ('number' === typeof this.maxVelocity) {
        this.velocity.limit(this.maxVelocity);
    }

    this.updatePosition(p, dt, vdt);
};

BaseObject.prototype.draw = function draw(p, dt) {
    p.stroke(0);
    p.strokeWeight(2);
    p.fill(255, 127);
    p.ellipse(this.position.x, this.position.y, this.size[0], this.size[1]);
};