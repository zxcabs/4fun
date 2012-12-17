var util = require('util');

/*
 * UserList - Список пользователя, наследуем от Array
 */
var UserList = module.exports = function UserList() {
	Array.apply(this)
}
util.inherits(UserList, Array);

UserList.prototype.toJSON = function () {
	var i, 
		l = this.length,
		arr = new Array(l);
	
	for (i = 0; l > i; i += 1) {
		arr[i] = this[i].toJSON();
	}
	
	return arr;
};