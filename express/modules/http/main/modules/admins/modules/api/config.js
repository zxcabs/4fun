/**
 * User: jo
 * Date: 13.06.13
 * Time: 16:26
 *
 */

exports.before = [
	function (req, res, next) {
		console.log('api');
		next();
	}
];

exports.after = [function (req, res, next) {
	res.status(404).send({ code: 404 });
}];