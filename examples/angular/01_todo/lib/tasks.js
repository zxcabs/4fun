/**
 * Created with JetBrains WebStorm.
 * User: reznichenko
 *
 */


var db = [],
    count = 0;

function uid() {
  return count += 1;
}

function Tasks(opt) {
    opt = opt || {};

    this.id = opt.id || uid();
    this.name = opt.name;
}

Tasks.find = function find(fn) {
    fn(null, db.slice());
};

Tasks.deleteById = function deleteById(id, fn) {
    id = parseInt(id, 10) || -1;

    db = db.filter(function (item) {
        return item.id !== id;
    });

    fn();
};

Tasks.prototype.save = function save(fn) {
    db.push({ id: this.id, name: this.name });
    if (fn) fn();
};

module.exports = Tasks;


