/**
 * User: jo
 * Date: 13.06.13
 * Time: 16:02
 *
 */


exports.index = function userIndex(req, res, next) {
	res.render('index');
};

exports.list = function userList(req, res, next) {
	res.render('list', { list: [{ name: 'Jo'}, { name: 'Mo' }]});
};
