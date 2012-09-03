/*
 * Polygon
 */
 
namespace('Polygon', function () {
	
	function Polygon(opt) {
		opt = opt || {};
		
		this.x = opt.x || 0;
		this.y = opt.y || 0;
		this.rot = opt.rot || 0;
		this.drot = opt.drot || 0.01;
		this.v = opt.v || 0;
		this.dv = opt.dv || 0.01;
		
		this.points = opt.points || [];
		this.strokeStyle = opt.strokeStyle || 'black';
	}
	
	return Polygon;
});