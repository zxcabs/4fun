/**
 * User: jo
 * Date: 13.06.13
 * Time: 16:14
 *
 */

var loadModule = require('./loadModules');

module.exports = modules;

function modules(name, opt) {
	opt = opt || {};
	return loadModule(name, opt);
}
