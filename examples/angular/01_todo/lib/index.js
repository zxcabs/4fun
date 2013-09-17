/**
 * Created with JetBrains WebStorm.
 * User: reznichenko
 *
 */

var express = require('express'),
    app = express();

var Tasks = require('./tasks.js');

new Tasks({ name: 'new task' }).save();
new Tasks({ name: 'super task' }).save();

//config
app.set('http_port', 4000);

app.use(express.logger('dev'));
app.use(express.static(__dirname + '/../public'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.get('/tasks', function (req, res, next) {
    Tasks.find(function (err, tasks) {
        if (err) return next(err);
        res.send(tasks);
    });
});

app.post('/tasks', function (req, res, next) {
    new Tasks(req.body).save(function (err) {
        if (err) return next(err);
        res.send('ok');
    });
});

app.del('/task/:id', function (req, res, next) {
    Tasks.deleteById(req.params.id, function (err) {
        if (err) return next(err);
        res.send('ok');
    });
});

module.exports = app;