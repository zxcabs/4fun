/*
 * Фэйковый файл бд
 */
 
//Начальные данные
var users = [];

exports.users = users;

//Сбрасываем состояние БД в начало
exports.regen = function () {
	exports.drop();
	exports.generate();
};

exports.drop = function () {
	//Что бы не потерять указатель, 
	//мы опустошаем текущий массив таким способом
	users.splice(0, users.length);
};

exports.generate = function () {
	//Заполняем массив
	users.push({ id: 0, name: 'Jo', age: 20, sex: 'm' });
	users.push({ id: 1, name: 'Bo', age: 19, sex: 'm' });
	users.push({ id: 2, name: 'Le', age: 18, sex: 'w' });
	users.push({ id: 10, name: 'NotFound', age: 18, sex: 'w' });	
};

//Генерируем начальные данные
exports.generate();