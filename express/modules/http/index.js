/**
 * User: jo
 * Date: 13.06.13
 * Time: 16:09
 *
 */

var run = require('./run');
var app = run('main', { verbose: true });

app.listen(3333, function () {
	console.log('Application running');
});