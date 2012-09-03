/*
 * index.js
 */
 
(function () {
	
	function drawPolygon(ctx, polygon, dt) {
		var points = polygon.points,
			i, l;
		
		ctx.save();
		ctx.translate(polygon.x, polygon.y);
		ctx.rotate(polygon.rot);
		
		ctx.beginPath();
		ctx.moveTo(points[0], points[1]);
		
		for (i = 2, l = points.length; l > i; i += 2) {	
			ctx.lineTo(points[i], points[i + 1]);
		}
		
		ctx.closePath();
		ctx.strokeStyle = polygon.strokeStyle;
		ctx.stroke();
		
		ctx.restore();
	}
	
	function main() {
		var Canvas = namespace('Canvas'),
			Multikey = namespace('Multikeypress'),
			Polygon = namespace('Polygon'),
			polygons = [],
			lastLoop, canvas, ctx, multi, player;
		
		
		function move(dt) {
		}
		
		function draw(dt) {
			var i, l;
			
			//draw polygon
			for (i = 0, l = polygons.length; l > i; i += 1) {
				drawPolygon(ctx, polygons[i], dt);				
			}
		}
		
		function loop() {
			var now = Date.now(),
				dt = now - lastLoop;
				
			move(dt);
			draw(dt);
			lastLoop = now;
			
			window.webkitRequestAnimationFrame(loop);
		}
		
		function init () {
			canvas = new Canvas({ el: document.getElementById('game'), width: 800, heght: 600 });
			ctx = canvas.getContext2d();
			multi = new Multikey();
			lastLoop = Date.now();
			
			player = new Polygon({ x: 400, y: 300, points: [-40, 40, 0, -40, 40, 40, 0, 20 ] });
			
			polygons.push(player);
			loop();
		}
		
		init();
	}
	
	window.addEventListener('load', main);
}());