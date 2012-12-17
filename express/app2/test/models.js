var should = require('should'),
	db = process.env.COVERAGE
			? require('../lib-cov/models/db.js')
			: require('../lib/models/db.js'),
	models = process.env.COVERAGE
			? require('../lib-cov/models/index.js')
			: require('../lib/models/index.js'),
	User = models.User,
	UserList = models.UserList;
	
describe('models', function () {

	//Эта функция будет вызвана один раз
	//внутри этого блока "describe('models')"
	before(function () {
		db.regen();
	});

	//Мы должны иметь модель User
	it('should be have User', function () {
		models.should.be.have.property('User');
		models.User.should.be.a('function');
	});
	
	//Мы должны иметь модель UserList
	it('should be have UserList', function () {
		models.should.be.have.property('UserList');
		models.UserList.should.be.a('function');
	});
	
	//Тестируем модель User
	describe('User', function () {
		
		//модель User должна иметь метод find
		it('should be have #find', function () {
			User.should.be.have.property('find');
			User.find.should.be.a('function');
		});
		
		//модель User должна иметь метод findById
		it('should be have #findById', function () {
			User.should.be.have.property('findById');
			User.findById.should.be.a('function');
		});
		
		//модель User должна иметь метод save
		it('should be have #save', function () {
			User.prototype.should.be.have.property('save');
			User.prototype.save.should.be.a('function');
		});
		
		//модель User должна иметь метод toJSON
		it('should be have #toJSON', function () {
			User.prototype.should.be.have.property('toJSON');
			User.prototype.toJSON.should.be.a('function');
		});
		
		describe('#find', function () {
			
			//find должен возвращать UserList
			it('should be instanceof UserList', function (done) {
				User.find(function (err, list) {
					if (err) return done(err);
					list.should.be.an.instanceOf(UserList);
					done();
				});
			});
			
			//find должен возвращать UserList, даже если ничего нет
			it('should not be exist', function (done) {
				//Дропаем БД
				db.drop();
				
				User.find(function (err, list) {
					//Восстанавливаем БД
					db.generate();
					if (err) return done(err);
					list.should.be.an.instanceOf(UserList);
					done();
				});
			});
		});
		
		describe('#findById', function () {
			
			//findById должен возвращать объект типа User
			it('should be instanceof User', function (done) {
				User.findById(0, function (err, user) {
					if (err) return done(err);
					user.should.be.an.instanceOf(User);
					done();
				});
			});
			
			//findById должен возвращать ничего, если пользователь не найдено
			it('should not be exists', function (done) {
				User.findById(100, function (err, user) {
					if (err) return done(err);
					should.not.exist(user);
					done();
				});				
			});
		});
		
		describe('#save', function () {
		
			//save должен выбрасывать ошибку, если указать неправильный возраст
			it('should not be saved', function (done) {
				var user = new User({ name: 'New user', age: 0, sex: 'w' });
				
				user.save(function (err) {
					err.should.eql('Invalid age');
					done();
				});
			});
			
			//Если все хорошо, то должен быть создан новый пользователь
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
		
		describe('#toJSON', function () {
		
			//toJSON должен возвращать json представление модели
			it('should be return json', function (done) {
				User.findById(0, function (err, user) {
					if (err) return done(err);
					user.toJSON().should.be.eql({ id: 0, name: 'Jo', age: 20, sex: 'm' });
					done();
				});
			});
		});
	});
	
	describe('UserList', function () {
	
		//UserList должен иметь метод toJSON
		it('should be have #toJSON', function () {
			UserList.prototype.should.be.have.property('toJSON');
			UserList.prototype.toJSON.should.be.a('function');
		});
	});
});