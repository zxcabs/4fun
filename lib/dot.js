/*
 * Dot
 */
namespace('Dot', function () {
	var Point = namespace('Point');
	
	function Dot(opt) {
		opt = opt || {};
		
		this.center = new Point(opt);
		this.z = opt.z || 0;
		this.fillStyle = opt.fillStyle || 'black';
	}
	
	Dot.prototype.draw = function (ctx) {
		var c = this.center;
		
		ctx.beginPath();
		ctx.fillStyle = this.fillStyle;
		ctx.arc(c.x, c.y, 1, 0, Math.PI * 2);
		ctx.fill();
		ctx.closePath();
	};
	
	return Dot;
});