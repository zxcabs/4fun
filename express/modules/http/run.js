/**
 * User: jo
 * Date: 13.06.13
 * Time: 16:14
 *
 */

var fs = require('fs'),
	p = require('path'),
	express = require('express');

module.exports = run;

function merge(a, b) {

	for (var key in b) {
		if (!a[key]) a[key] = b[key];
	}

	return a;
}

function loadControllers(parent, module, opt) {
	var verbose = opt.verbose;
	var controllersDir = p.resolve(module.dir, 'controllers');

	fs.readdirSync(controllersDir).forEach(function (name) {
		var conPath = p.join(controllersDir, name),
			con = require(conPath),
			name = con.name || name,
			prefix = con.prefix || '',
			engine = con.engine || parent.get('view engine'),
			views = con.views || p.join(conPath, 'views'),
			app = express(),
			method,
			path;

		// allow specifying the view engine
		app.set('view engine', engine);
		app.set('views', views);

		// before middleware support
		if (con.before) {
			path = '/' + name + '/:' + name + '_id';
			app.all(path, con.before);
			verbose && console.log('     ALL %s -> before', path);
			path = '/' + name + '/:' + name + '_id/*';
			app.all(path, con.before);
			verbose && console.log('     ALL %s -> before', path);
		}

		// generate routes based
		// on the exported methods
		for (var key in con) {
			// "reserved" exports
			if (~['name', 'prefix', 'engine', 'before'].indexOf(key)) continue;
			// route exports
			switch (key) {
				case 'show':
					method = 'get';
					path = '/' + name + '/:' + name + '_id';
					break;
				case 'list':
					method = 'get';
					path = '/' + name + 's/';
					break;
				case 'edit':
					method = 'get';
					path = '/' + name + '/:' + name + '_id/edit';
					break;
				case 'update':
					method = 'put';
					path = '/' + name + '/:' + name + '_id';
					break;
				case 'create':
					method = 'post';
					path = '/' + name;
					break;
				case 'index':
					method = 'get';
					path = ('index' === name) ? '/': '/' + name;
					break;
				default:
					throw new Error('unrecognized route: ' + name + '.' + key);
			}

			path = prefix + path;
			app[method](path, con[key]);
			verbose && console.log('     %s %s -> %s', method.toUpperCase(), path, key);
		}

		// mount the app
		parent.use(app);
	});
}

function loadModule(name, opt, parent) {

	var verbose = opt.verbose,
		module = {},
		app,
		config, engine, views, before, after, submoddir,
		root, strictRouting;


	verbose && console.log('\n load module: %s', name);

	module.parent = parent;
	module.name = name;
	module.isRoot = !parent;
	module.dir = parent && p.resolve(parent.dir, 'modules', name) || p.resolve(name);
	module.submodule = [];


	root = module.root = module.isRoot ? module: parent.root;
	app = module.app = express();
	config = module.config = require(p.join(module.dir, 'config'));
	engine = config.engine = config.engine || (parent && parent.config.engine) || (root.config.engine || 'jade');
	strictRouting = module.strict_routing = config.strict_routing || (parent && parent.config.strict_routing) || (root.config.strict_routing || false);
	views = config.views = config.views || p.join(module.dir, 'views');
	before = config.before;
	after = config.after;

	app.set('view engine', engine);
	app.set('views', views);
	app.set('strict routing', strictRouting);

	if (before) before.forEach(function (fn) {
		app.use(fn);
	});

	//loadControllers
	loadControllers(app, module, opt);


	submoddir = p.join(module.dir, 'modules');
	//load submodule
	if (fs.existsSync(submoddir)) {
		fs.readdirSync(submoddir).forEach(function (subname) {
			app.use('/' + subname, loadModule(subname, opt, module));
		});
	}

	if (after) after.forEach(function (fn) {
		app.use(fn);
	});

	return app;
}

function run(name, opt) {
	opt = opt || {};
	return loadModule(name, opt);
};
