/**
 * Created with JetBrains WebStorm.
 * User: reznichenko
 *
 */


var express = require('express'),
    app = express();


var Articles = require('./articles.js');

//generate data
do {
    var aa = new Articles({
        title: 'Random title: ' + (Math.random() * 1000 | 0),
        text: 'Super article: ' + (Math.random() * 1000 | 0)
    });
    aa.save();
} while (aa.id < 150);

app.get('/articles', function (req, res, next) {
    var query = {
        limit: {
            from: parseInt(req.query.from, 10),
            count: parseInt(req.query.count, 10)
        }
    };


    Articles.find(query, function (err, articles) {
        if (err) return next(err);
        articles = articles.map(function (articles) { return articles.toJSON(); });
        res.send({ articles: articles });
    });
});

app.get('/article/:id', function (req, res, next) {
    var id = parseInt(req.params.id, 10);

    Articles.findById(id, function (err, article) {
        if (err) return next(err);
        if (!article) return res.status(404).send({});
        res.send(article.toJSON());
    });
});

module.exports = app;