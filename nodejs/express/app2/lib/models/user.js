var util = require('util'),
	db = require('./db.js'),
	UserList = require('./userlist.js'),
	users = db.users;

/*
 * Модель пользователей
 */
var User = module.exports = function User(opt) {
	this.id = users.length;
	this.name = opt.name;
	this.age = opt.age;
	this.sex = opt.sex;
	
	this.isNew = true;
}

/*
 * Вызываем когда нужно инициализировать объект из базы
 */
function loadFromObj(obj) {
	var user = new User(obj);
	
	user.id = obj.id;
	user.isNew = false;
	
	return user;
}

/*
 * Ищем всех пользователей и возвращяем массив
 */
User.find = function (fn) {
	var i, 
		l = users.length,
		list = new UserList();

	for (i = 0, l; l > i; i += 1) {
		list.push(loadFromObj(users[i]));
	}
	
	fn(null, list);
};

/*
 * Ищем пользователя по id
 */
User.findById = function (id, fn) {
	var obj = users[id],
		user;
	
	if (obj) {
		user = loadFromObj(obj);
	}
	
	fn(null, user);
};

/*
 * Сохраняем
 */
User.prototype.save = function (fn) {
	var err;
	
	//Проверяем возраст на валидность
	if (Number.isFinite(this.age) && this.age > 0 && this.age < 150) {
		if (this.isNew) {
			users.push(this.toJSON());
			this.isNew = false;
		} else {
			users[this.id] = this.toJSON();
		}
	} else {
		err = 'Invalid age';
	}
	
	fn(err);
};

User.prototype.toJSON = function () {
	var json = {
			id: this.id,
			name: this.name,
			age: this.age,
			sex: this.sex
		};
	
	return json;
};