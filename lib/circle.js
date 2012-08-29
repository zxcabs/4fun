/*
 * Circle
 */
 
namespace('Circle', function () {
	var utils = namespace('utils'),
		Point = namespace('Point');
	
	function Circle(opt) {
		opt = opt || {};
		
		this.constructor.super_.apply(this, arguments);
		
		this.r = opt.r || this.r;
		this.fillStyle = opt.fillStyle || this.fillStyle;
	}
	
	utils.inherits(Circle, Point);
	
	return Circle;
});