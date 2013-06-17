/**
 * User: jo
 * Date: 14.06.13
 * Time: 17:28
 *
 */


exports.merge = merge;


function merge(a, b) {

	for (var key in b) {
		if (!a[key]) a[key] = b[key];
	}

	return a;
}
