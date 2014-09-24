// This file was automatically generated from "base.lmd.json"
_6451fc01({
"game/index": (function (require, exports, module) { /* wrapped by builder */
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
}),
"game/objects/base": (function (require, exports, module) { /* wrapped by builder */
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
}),
"game/objects/bullet": (function (require, exports, module) { /* wrapped by builder */
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

}),
"game/objects/missile": (function (require, exports, module) { /* wrapped by builder */
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
}),
"game/objects/ship": (function (require, exports, module) { /* wrapped by builder */
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
})
},{});
