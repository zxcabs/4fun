/*
 * Canvas.js
 */
 
namespace('Canvas', function () {
	
	var defaultWidth = 400,
		defaultHeight = 400;
		
	function createCanvas(width, height) {
		var canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
		return canvas;
	}

	function Canvas(opt) {
		opt = opt || {};
		
		this.el = opt.el || document.body;
		this.width = opt.width || defaultWidth;
		this.height = opt.height || defaultHeight;
		
		this.canvas = createCanvas(this.width, this.height);
		
		this.el.appendChild(this.canvas);		
	}
	
	Canvas.prototype.getContext2d = function () {
		
		if (!this._ctx) {
			this._ctx = this.canvas.getContext('2d');
		}
		
		return this._ctx;
	};
	
	return Canvas;
});