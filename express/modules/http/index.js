/**
 * User: jo
 * Date: 13.06.13
 * Time: 16:09
 *
 */

var modules = require('modules');
var module = modules('main', { verbose: true });

module.app.listen(3333, function () {
	console.log('Application running');
});