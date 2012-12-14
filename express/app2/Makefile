FIX_CHAR = ./node_modules/fix-char/bin/fix-char
MOCHA = ./node_modules/.bin/mocha

test:
	@NODE_ENV=test $(MOCHA) \
		--require should \
		-R spec


test-cov: lib-cov
	@COVERAGE=1 $(MOCHA) \
		--require should \
		-R html-cov > coverage.html

lib-cov: clear
	@jscoverage --encoding=utf8 --no-highlight lib lib-cov
	@find lib-cov/*.js | xargs $(FIX_CHAR)

clear:
	@rm -rf lib-cov coverage.html
	
.PHONY: test test-cov clear