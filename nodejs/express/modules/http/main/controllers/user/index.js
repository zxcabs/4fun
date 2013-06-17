/**
 * User: jo
 * Date: 13.06.13
 * Time: 17:34
 *
 */

exports.index = function userIndex(req, res, next) {
	res.render('index');
};

exports.show = function userShow(req, res, next) {
	var userId = req.params.user_id;
	res.render('show', { userId: userId });
};

exports.edit = function userEdit(req, res, next) {
	var userId = req.params.user_id;

	res.render('edit', { userId: userId });
};