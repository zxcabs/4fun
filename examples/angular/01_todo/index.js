/**
 * Created with JetBrains WebStorm.
 * User: reznichenko
 *
 */


var app = require('./lib/index.js');

app.listen(app.get('http_port'), function (err) {
    if (err) return console.error(err);
    console.log('Running on %s port', app.get('http_port'));
});