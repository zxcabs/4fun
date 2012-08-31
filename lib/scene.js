/*
 * Scene
 */
namespace('Scene', function () {
	
	function Scene(opt) {
		opt = opt || {};
		
		this.canvas = opt.canvas;
		this.ctx = this.canvas.getContext2d();
		this.width = opt.width || this.ctx.width;
		this.height = opt.height || this.ctx.height;
		
		this.dots = opt.dots || [];
		this.circles = opt.circles || [];
		this.polynomes = opt.polynomes || [];
	}
	
	
	Scene.prototype.addDot = function (dot) {
		this.dots.push(dot);
	};
	
	Scene.prototype.drawDots = function (ctx, dt) {
		var dots = this.dots,
			i, l, dot;
		
		for (i = 0, l = dots.length; l > i; i += 1) {
			dot = dots[i];
			ctx.beginPath();
			ctx.arc(dot.center.x, dot.center.y, 1, 0, 6.28);
			ctx.fillStyle = dot.fillStyle;
			ctx.fill();
			ctx.closePath();
		}
	};
	
	Scene.prototype.draw = function (dt) {
		var ctx = this.ctx;
		
		this.drawDots(ctx, dt);
	};
	
	Scene.prototype.move = function (dt) {};
	return Scene;
});