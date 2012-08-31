/*
 * App
 */
 
namespace('App', function () {
	function App() {
		this._lastLoop = Date.now();
		
		setTimeout(this._loop.bind(this), 1);
	}
	
	App.prototype.loop = function (dt) {};
	App.prototype._loop = function () {
		var now = Date.now(),
			dt = now - this._lastLoop;
		
		this.loop(dt);
		this._lastLoop = now;
		window.webkitRequestAnimationFrame(this._loop.bind(this));
	};
	
	return App;
});