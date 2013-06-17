/*
 * Tools
 */

function merge(a, b) {
	var key;
	
	if (a && b) {
		for (key in b) {
			a[key] = b[key];
		}
	}
	
	return a;
}

exports.merge = merge;