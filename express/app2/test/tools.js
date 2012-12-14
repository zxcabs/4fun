var tools = process.env.COVERAGE
			? require('../lib-cov/tools/index.js')
			: require('../lib/tools/index.js');

describe('tools', function () {
	
	it('should be have #merge', function () {
		tools.should.be.have.property('merge');
		tools.merge.should.be.a('function');
	});
	
	describe('#merge', function () {
		it('should merged', function () {
			var a = { foo: '1' },
				b = { bar: '2' };
				
			tools.merge(a, b).should.eql({ foo: '1', bar: '2' });
		});
		
		it('should be extend', function () {
			var a = { foo: '1' },
				b = { bar: '2' };
				
			tools.merge(a, b);
			//строгое сравнение по ссылке, убеждаемся что это 
			//один и тот же объект
			a.should.not.equal({ foo: '1', bar: '2' });
			a.should.equal(a);
		});
		
		it('should not be extended', function () {
			var a = { foo: '1' },
				b = { bar: '2' };
				
			tools.merge(a, b);
			b.should.not.eql({ foo: '1', bar: '2' });
		});
	});
});