/**
 * @author "Evgeny Reznichenko" <kusakyky@gmail.com>
 */



module.exports = List;
exports.Item = Item;

/**
 * List item
 *
 * @param data
 * @constructor
 */
function Item(data) {
    this.data = data;

    this._next = null;
    this._prev = null;
}

Item.prototype.next = function next() {
    return this._next;
};

Item.prototype.prev = function prev() {
    return this._prev;
};

Item.prototype.remove = function remove() {
    var
        next = this.next(),
        prev = this.prev();

    this._next = null;
    this._prev = null;
    this.data = null;

    if (next) {
        next._prev = prev;
    }

    if (prev) {
        prev._next = next;
    }
};

Item.prototype.append = function (item) {
    var
        next = this.next();

    this._next = item;
    item._prev = this;
    item._next = next;

    if (next) {
        next._prev = item;
    }

    return item;
};

/**
 * List
 *
 * @constructor
 */
function List() {
    this._head = null;
    this._tail = null;
}

List.prototype.push = function push(data) {
    var
        item = new Item(data);

    if (this._tail) {
        this._tail = this._tail.append(item);
    } else {
        this._head = this._tail = item;
    }
};

List.prototype.pop = function pop() {
    var
        res = null,
        item = this._tail;

    if (!item) return res;
    res = item.data;

    if (this._head === item) {
        this._head = null;
        this._tail = null;
    } else {
        this._head = item.next();
        this._tail = item.prev();
    }

    item.remove();

    return res;
};

List.prototype.each = function each(fn) {
    var
        item = this._head;

    while (item) {
        if (fn(item.data, item) === false) break;
        item = item.next();
    }
};

List.prototype.remove = function (item) {
    if (this._head === item && this._tail === item) {
        this._head = this._tail = null;
    } else if (this._head === item) {
        this._head = item.next();
    } else if (this._tail === item) {
        this._tail = item.prev();
    }

    item.remove();
};