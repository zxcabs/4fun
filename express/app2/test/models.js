var should = require('should'),
	db = require('../models/db.js'),
	models = require('../models/user.js'),
	User = models.User,
	UserList = models.UserList;
	
describe('models', function () {
	
	//Тестируем модель User
	describe('.User', function () {
		
		//Эта функция будет вызываться на каждый `it`
		//внутри этого блока "describe('.User')"
		beforeEach(function () {
			db.regen();
		});
		
		describe('#find', function () {
			
			it('should be instanceof UserList', function (done) {
				User.find(function (err, list) {
					if (err) return done(err);
					list.should.be.an.instanceOf(UserList);
					done();
				});
			});
			
			it('should not be exist', function (done) {
				//Дропаем БД
				db.drop();
				
				User.find(function (err, list) {					
					if (err) return done(err);
					should.not.exist(list);
					done();
				});
			});
		});
		
		describe('#findById', function () {
			
			it('should be instanceof User', function (done) {
				User.findById(0, function (err, user) {
					if (err) return done(err);
					user.should.be.an.instanceOf(User);
					done();
				});
			});
			
			it('should not be exists', function (done) {
				User.findById(100, function (err, user) {
					if (err) return done(err);
					should.not.exist(user);
					done();
				});				
			});
		});
		
		describe('#save', function () {
			it('should not be saved', function (done) {
				var user = new User({ name: 'New user', age: 0, sex: 'w' });
				
				user.save(function (err) {
					err.should.eql('Invalid age');
					done();
				});
			});
			
			it('should be saved', function (done) {
				var newuser = new User({ name: 'New user', age: 2, sex: 'w' });
				
				newuser.save(function (err) {
					if (err) return done(err);
					
					User.findById(newuser.id, function (err, user) {
						if (err) return done(err);
						user.should.eql(newuser);
						done();
					});
				});
			});
		});		
	});
});