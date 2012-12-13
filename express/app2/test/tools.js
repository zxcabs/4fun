var tools = require('../tools/index.js');

describe('tools', function () {
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
			a.should.eql({ foo: '1', bar: '2' });
		});
		
		it('should not be extended', function () {
			var a = { foo: '1' },
				b = { bar: '2' };
				
			tools.merge(a, b);
			b.should.not.eql({ foo: '1', bar: '2' });
		});
	});
});