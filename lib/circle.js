/*
 * Circle
 */
 
namespace('Circle', function () {
	var utils = namespace('utils'),
		Dot = namespace('Dot');
	
	function Circle(opt) {
		opt = opt || {};
		
		this.constructor.super_.apply(this, arguments);
		
		this.r = opt.r || this.r;
	}
	
	utils.inherits(Circle, Dot);
	
	Circle.prototype.draw = function (ctx) {
		var c = this.center;
		
		ctx.beginPath();
		ctx.fillStyle = this.fillStyle;
		ctx.arc(c.x, c.y, this.r, 0, Math.PI * 2);
		ctx.fill();
		ctx.closePath();
	};
	
	return Circle;
});