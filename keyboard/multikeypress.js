Multikeypress = (function () {
	function __foo(){};
	
	function onkeydown(obj) {
		var keys = obj._keys;
		
		return function (e) {
			var i = e.keyCode;
			
			if (!keys[i]) {
				obj._count += 1;
			}
			
			keys[i] = e;				
			obj._fireevent();
		};
		
	}
	
	function onkeyup(obj) {
		var keys = obj._keys;
		return function (e) {
			var code = e.keyCode;
			
			if (keys[code]) {
				keys[code] = null;
				obj._count -= 1;
			}
		};
	}
	
	function addEvents(el, obj) {
		if (el.addEventListener) {
			el.addEventListener('keydown', onkeydown(obj));
			el.addEventListener('keyup', onkeyup(obj));
		} else if (el.attachEvent) {
			el.attachEvent('onkeydown', onkeydown(obj));
			el.attachEvent('onkeyup', onkeyup(obj));
		}
	}
	
	function Multikeypress(elem) {
		this._el = elem || document;
		this._keys = {};
		this._count = 0;
		this._timer;
		
		addEvents(this._el, this);
	}
	
	Multikeypress.prototype._fireevent = function () {
		var self = this,
			keys = self._keys;
		
		if (!self._timer) {
			self.onkeyspress(keys);
			
			self._timer = setTimeout(function () {
				self._timer = null;
				
				if (self._count > 0) {
					self._fireevent();
				}
			}, 15);
		}
	};
	
	Multikeypress.prototype.onkeyspress = __foo;
	
	return Multikeypress;
}());