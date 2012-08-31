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
	
	return Dot;
});