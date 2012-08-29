/*
 * Point.js
 */
namespace('Point', function () {
	
	function Point(opt) {
		opt = opt || {};
		
		this.x = opt.x || 0;
		this.y = opt.y || 0;
		
		this.r = 1;
		this.z = 1;
		this.fillStyle = 'rgb(0,0,0)';
	}
	
	Point.prototype.draw = function (ctx) {
		ctx.beginPath();
		ctx.fillStyle = this.fillStyle;
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		ctx.fill();
		ctx.closePath();
	}
	
	return Point;
});