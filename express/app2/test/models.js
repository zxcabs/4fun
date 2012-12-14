var should = require('should'),
	db = process.env.COVERAGE
			? require('../lib-cov/models/db.js')
			: require('../lib/models/db.js'),
	models = process.env.COVERAGE
			? require('../lib-cov/models/user.js')
			: require('../lib/models/user.js'),
	User = models.User,
	UserList = models.UserList;
	
describe('models', function () {

	//Эта функция будет один раз
	//внутри этого блока "describe('models')"
	before(function () {
		db.regen();
	});

	//Тестируем модель User
	describe('User', function () {

		it('should be have #find', function () {
			User.should.be.have.property('find');
			User.find.should.be.a('function');
		});
		
		it('should be have #findById', function () {
			User.should.be.have.property('findById');
			User.findById.should.be.a('function');
		});
		
		it('should be have #save', function () {
			User.prototype.should.be.have.property('save');
			User.prototype.save.should.be.a('function');
		});
		
		it('should be have #toJSON', function () {
			User.prototype.should.be.have.property('toJSON');
			User.prototype.toJSON.should.be.a('function');
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
					//Восстанавливаем БД
					db.generate();
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
	
	describe('UserList', function () {
		it('should be have #toJSON', function () {
			UserList.prototype.should.be.have.property('toJSON');
			UserList.prototype.toJSON.should.be.a('function');
		});
	});
});