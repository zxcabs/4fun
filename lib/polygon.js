/*
 * Polygon
 */
 
namespace('Polygon', function () {
	var utils = namespace('utils'),
		Point = namespace('Point');
		Dot = namespace('Dot');
	
	function Polygon(opt) {
		opt = opt || {};
		this.constructor.super_.apply(this, arguments);
		
		this.rot = opt.rot || 0;
		this.points = [];
		
		this._initPoints(opt.points);
	}

	utils.inherits(Polygon, Dot);
	
	Polygon.prototype._initPoints = function (points) {
		var ps = this.points,
			p, l, i;
		
		if (points && points.length) {
			for (i = 0, l = points.length; l > i; i += 1) {
				p = points[i];
				ps.push(p.x || 0);
				ps.push(p.y || 0);
			}
		} else {
			px.push(c.x);
			px.push(c.y);
		}
	};
	
	Polygon.prototype.draw = function (ctx) {
		var c = this.center,
			points = this.points,
			l = points.length,
			i;

		ctx.save();
		ctx.translate(c.x, c.y);
		ctx.rotate(this.rot);
		
		ctx.beginPath();
		ctx.moveTo(points[0], points[1]);
		
		for (i = 2; l > i; i += 2) {
			ctx.lineTo(points[i], points[i + 1]);
		}
		
		ctx.closePath();
		ctx.fillStyle = this.fillStyle;
		ctx.fill();
		
		ctx.restore();
	};
	
	return Polygon;
	
});