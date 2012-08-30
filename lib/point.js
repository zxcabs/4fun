/*
 * Point.js
 */
namespace('Point', function () {
	
	function Point(opt) {
		opt = opt || {};
		
		this.x = opt.x || 0;
		this.y = opt.y || 0;
	}

	return Point;
});