/*
 * namespace
 */
 
namespace = (function () {
	var space = {};
	
	//path [,fn]
	function namespace(path, fn) {
		var arrPath = path.split('.'),
			l, i, item, last,
			fnresult,
			current = space;
		
		for (i = 0, l = arrPath.length; l > i; i += 1) {
			item = arrPath[i];
			last = current;
			
			if (!current[item]) {
				current[item] = {};
			}
			
			current = current[item];
		}
		
		
		if (fn) {
			fnresult = fn(current);
			
			if (fnresult) {
				last[item] = fnresult;
			}
		}
		
		return current;
	}	
	
	return namespace;
}());