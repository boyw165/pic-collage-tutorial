ES6_CC = babel
WEBPACK = ./node_modules/webpack/bin/webpack.js

clean:
	@echo [clean]
	rm -rf dist/
	mkdir dist/

es6cc:
	@echo [es6 cc]
	$(ES6_CC) src --out-dir dist

webpack-dev:
	@echo [webpack]
	$(WEBPACK) -d --progress --config webpack.config.js

webpack-dev-watch:
	@echo [webpack]
	$(WEBPACK) -d --progress --config webpack.config.js --watch

webpack-prod:
	@echo [webpack]
	$(WEBPACK) -p --progress --config webpack.config.js

static:
	@echo [static]
	cp -r public dist/client

build: static webpack-dev

clean-build: clean static webpack-dev

watch-build: clean static webpack-dev-watch

prod-build: clean static webpack-prod
