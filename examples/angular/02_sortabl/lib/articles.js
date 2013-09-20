/**
 * Created with JetBrains WebStorm.
 * User: reznichenko
 *
 */

var db = [],
    count = 0;

function uid() {
    return count++;
}

function noop() {}

function Articles(article) {
    article = article || {};

    this.isNew = isNaN(parseInt(article.id, 10));
    this.id = this.isNew ? uid(): article.id;
    this.title = article.title || 'New article';
    this.text = article.text || '';
}

Articles.load = function load(article) {
    return new Articles(article);
};


Articles.findById = function findById(id, fn) {
    fn(null, Articles.load(db[id]));
};


Articles.find = function find(q, fn) {
    if (arguments.length === 1) {
        fn = q;
        q = {};
    }

    var limit = q.limit || {},
        from = limit.from || 0,
        count = limit.count || 20,
        result = db.slice(from, from + count).map(Articles.load);

    fn(null, result);
};

Articles.prototype.toJSON = function toJSON() {
    return {
        id: this.id,
        title: this.title,
        text: this.text
    };
};


Articles.prototype.save = function save(fn) {
    fn = fn || noop;

    if (this.isNew) return this._save(fn);
    //update

    var indb = db[this.id];

    indb.title = this.title;
    indb.text = this.text;

    fn();
};

Articles.prototype._save = function (fn) {
    db[this.id] = this.toJSON();
    fn();
};


module.exports = Articles;