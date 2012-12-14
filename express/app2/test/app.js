var request = require('supertest'),
	app = process.env.COVERAGE
			? require('../lib-cov/app.js')
			: require('../lib/app.js');
	
describe('Response html or json', function () {
	//Если это обычный запрос, должны получить 
	//ответ в виде html
	it('should be responded as html', function (done) {
		request(app)
			.get('/')
			.expect('Content-Type', /text\/html/)
			.expect(200, done);
	});
	
	//Если это аякс, должны получать json
	it('should be responded as json', function (done) {
		request(app)
			.get('/')
			.set('X-Requested-With', 'XMLHttpRequest')
			.expect('Content-Type', /application\/json/)
			.expect(200, done);
	});
});

describe('GET /', function () {
	it('should be included title', function (done) {
		request(app)
			.get('/')
			.expect('Content-Type', /text\/html/)
			.end(function (err, res) {
				if (err) return done(err);
				res.text.should.include('<title>Мой сайт</title>');
				done();
			});
	});
	
	it('should be included title', function (done) {
		request(app)
			.get('/')
			.set('X-Requested-With', 'XMLHttpRequest')
			.expect('Content-Type', /application\/json/)
			.end(function (err, res) {
				if (err) return done(err);
				res.should.be.json;
				res.body.should.have.property('data');
				res.body.data.should.have.property('title', 'Мой сайт');
				done();
			});
	});
});