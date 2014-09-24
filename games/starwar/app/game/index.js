/**
 * @author "Evgeny Reznichenko" <kusakyky@gmail.com>
 */

var
    P5 = require('p5'),
    BaseShip = require('game/objects/ship'),
    List = require('lib/list');

module.exports = Game;


function Game(opt) {
    opt = opt = {};

    this.width = opt.width || 800;
    this.height = opt.height || 600;

    this.parent = opt.parent || 'body';

    this.objects = new List();

    this.p5 = new P5(this._setup.bind(this), this.parent);
}

Game.prototype._setup = function setup(p) {
    var
        self = this,
        last = Date.now(),
        objects = self.objects;

    p.setup = function () {
        p.createCanvas(self.width, self.height);
        p.stroke(255);
        p.frameRate(60);
    };

    p.draw = function() {
        var
            now = Date.now(),
            dt = (now - last) / 1000,
            vdt = 1 + dt;

        last = now;
        p.background(0);

        objects.each(function (object, item) {
            object.move(p, dt, vdt);

            if (object.isDead) {
                objects.remove(item);

                if (object.ship) {
                    objects.push(object.ship.simpleFire(p));
                }
            } else {
                object.draw(p, dt);
            }
        });
    };
};

Game.prototype.addPlayer = function () {
    var
        ship1 = new BaseShip(this.p5, { x: 0, y: 0, dx: 0.4, dyy: 0.01, size: 20 }),
        ship2 = new BaseShip(this.p5, { x: this.width, y: this.height, dxx: -0.4, dyy: -0.4, size: 20 });

    this.objects.push(ship1);
    this.objects.push(ship2);

    this.objects.push(ship1.simpleFire(this.p5));
    this.objects.push(ship2.missileFire(this.p5));
};