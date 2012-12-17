MOCHA = ./node_modules/.bin/mocha

test:
	@NODE_ENV=test $(MOCHA) \
		-r should \
		-R spec


test-cov: lib-cov
	@COVERAGE=1 $(MOCHA) \
		-r should \
		-R html-cov > coverage.html

lib-cov: clear
	@jscoverage --encoding=utf8 --no-highlight lib lib-cov

clear:
	@rm -rf lib-cov coverage.html
	
.PHONY: test test-cov clear