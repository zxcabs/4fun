/*
 * Box
 */
 
namespace('Box', function () {
	var utils = namespace('utils'),
		Point = namespace('Point');
	
	function Box(opt) {
		opt = opt || {};
		
		this.constructor.super_.apply(this, arguments);
		
		this.h = opt.h || 10;
		this.w = opt.w || 10;
		this.rot = opt.rot || 0;
		
		this.x0 = -((this.w / 2) | 0);
		this.y0 = -((this.h / 2) | 0);
		
		this.fillStyle = opt.fillStyle || this.fillStyle;
	}
	
	utils.inherits(Box, Point);
	
	Box.prototype.draw = function (ctx) {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.rot);
		ctx.fillStyle = this.fillStyle;
        ctx.fillRect(this.x0, this.y0, this.w, this.h);
		ctx.restore();
	};
	
	return Box;
});