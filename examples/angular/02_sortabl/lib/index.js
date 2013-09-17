/**
 * Created with JetBrains WebStorm.
 * User: reznichenko
 *
 */

var express = require('express'),
    app = express();

var Articles = require('./articles.js');

//config
app.set('http_port', 4000);

app.use(express.logger('dev'));
app.use(express.static(__dirname + '/../public'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.get('/tasks', function (req, res, next) {
    Articles.find(function (err, tasks) {
        if (err) return next(err);
        res.send(tasks);
    });
});

app.post('/tasks', function (req, res, next) {
    new Articles(req.body).save(function (err) {
        if (err) return next(err);
        res.send('ok');
    });
});

app.del('/task/:id', function (req, res, next) {
    Articles.deleteById(req.params.id, function (err) {
        if (err) return next(err);
        res.send('ok');
    });
});

module.exports = app;