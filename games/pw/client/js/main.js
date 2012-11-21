function loadImage(src, fn) {
	var img = new Image();
	img.src = src;
	
	function removeListeners() {
		img.removeEventListener('load');
		img.removeEventListener('error');
	}
	
	img.addEventListener('load', function () {
		removeListeners();
		fn(null, img);
	});
	
	img.addEventListener('error', function () {
		removeListeners();
		fn('Error on load image: ' + src);
	});
}
// Sprite
function Sprite(opt) {
	this.img = opt.img;
	
	this.sW = opt.sW || 0;
	this.sH = opt.sH || 0;
	
	this.iX = opt.iX || 0;
	this.iY = opt.iY || 0;
}
//


//Entity
function Entity(opt) {
	this.sprite = opt.sprite;
	this.x = opt.x || 0;
	this.y = opt.y || 0;
	
	this.dX = opt.dX || 0;
	this.dY = opt.dY || 0;
	
	this.vX = opt.vX || 0;
	this.vY = opt.vY || 0;
}

function drawSprite(ctx, sprite, x, y, mX, mY) {
	mX = mX || 1;
	mY = mY || 1;
	
	var sW = sprite.sW,
		sH = sprite.sH,
		iX = sprite.iX,
		iY = sprite.iY;
	
	x = (x - (sW / 2)) | 0;
	y = (y - (sH / 2)) | 0;
	
	ctx.drawImage(sprite.img, sW * iX, sH * iY, sW, sH, x, y, sW * mX, sH * mY);
}

(function () {
	var rImages = [{ name: 'tank', src: 'image/tank.png'}, { name: 'bullet', src: 'image/bullet.png' }];
	
	function loadResource(fn) {
		var r = {
				images: {}
			};
			
		(function next(i) {
			var im = rImages[i];
			if (im) {
				loadImage(im.src, function (err, img) {
					if (err) return fn(err);
					r.images[im.name] = img;
					i += 1;
					next(i);
				});
			} else {
				fn(null, r);
			}
		}(0));
	}

	function init() {
		var canvas = document.getElementById('main'),
			ctx = canvas.getContext('2d'),
			kKey = {},
			player,
			resource,
			lastShoot = 0,
			bullets = [],
			entity = [];
		
		function draw() {
			var l = entity.length,
				ent;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			
			while (l--) {
				ent = entity[l];
				drawSprite(ctx, ent.sprite, ent.x, ent.y);
			}
		}
		
		function input(dt) {
			var now = Date.now(),
				canShoot = (now - lastShoot) > 500;
			
			player.vX = 0;
			player.vY = 0;
			
			if (kKey[37]) {
				player.sprite.iX = 3;
				player.vX = -player.dX;
			} else if (kKey[38]) {
				player.sprite.iX = 0;
				player.vY = -player.dY;
			} else if (kKey[39]) {
				player.sprite.iX = 1;
				player.vX = player.dX;
			} else if (kKey[40]) {
				player.sprite.iX = 2;
				player.vY = player.dY;
			}
			
			//Fire!!!
			//TODO remove bullet
			if (kKey[32] && canShoot) {
				lastShoot = now;
				entity.push(new Entity({
						sprite: new Sprite({ img: resource.images.bullet, sW: 20, sH: 20 }),
						x: player.x,
						y: player.y,
						vX: player.sprite.iX === 3 ? -240: (player.sprite.iX === 1 ? 240 : 0),
						vY: player.sprite.iX === 0 ? -240: (player.sprite.iX === 2 ? 240 : 0)
					}));
			}
		}
		
		function move(dt) {
			var l = entity.length,
				sec = dt / 1000,
				enty;
			
			while (l--) {
				enty = entity[l];
				enty.x += enty.vX * sec;
				enty.y += enty.vY * sec;
			}
		}
		
		function start() {
			var lastTime = Date.now();
			
			//Create player
			player = new Entity({
				sprite: new Sprite({ img: resource.images.tank, sW: 60, sH: 60 }),
					x: 400,
					y: 300,
					dX: 60,
					dY: 60
			});
			
			entity.push(player);
			
			function onTick() {
				var now = Date.now(),
					dt = now - lastTime;

				input(dt);
				move(dt);
				draw();
				window.webkitRequestAnimationFrame(onTick);

				lastTime = Date.now();
			}
			
					
			window.addEventListener('keydown', onKey('down'));
			window.addEventListener('keyup', onKey('up'));
			
			onTick();
		}
		
		loadResource(function (err, res) {
			if (err) return console.log(err);
			console.log('Resource loaded');
			resource = res;
			start();
		});
		
		function onKey(pos) {
			return function (e) {
				var code = e.keyCode;
				
				switch (pos) {
					case 'down':
						kKey[code] = true;
						break;
					case 'up':
						kKey[code] = false;
						break;
				}
			};
		}

	}
	
	
	window.addEventListener('load', init);
}());