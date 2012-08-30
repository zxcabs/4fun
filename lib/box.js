/*
 * Box
 */
 
namespace('Box', function () {
	var utils = namespace('utils'),
		Point = namespace('Point'),
		Dot = namespace('Dot');
	
	function Box(opt) {
		opt = opt || {};
		
		this.constructor.super_.apply(this, arguments);
		
		this.h = opt.h || 10;
		this.w = opt.w || 10;
		this.rot = opt.rot || 0;
		this.p0 = new Point({ x: -((this.w / 2) | 0), y: -((this.h / 2) | 0) });
	}
	
	utils.inherits(Box, Dot);
	
	Box.prototype.draw = function (ctx) {
		var c = this.center,
			p0 = this.p0;
		
		ctx.save();
		ctx.translate(c.x, c.y);
		ctx.rotate(this.rot);
		ctx.fillStyle = this.fillStyle;
        ctx.fillRect(p0.x, p0.y, this.w, this.h);
		ctx.restore();
	};
	
	return Box;
});