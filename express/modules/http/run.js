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

function loadControllers(parent, opt) {
	var verbose = opt.verbose;
	var controllersDir = p.resolve(opt.__modroot, 'controllers');

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
					path = '/' + name + 's';
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
					path = ('index' === name)? '/': '/' + name;
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

function run(name, opt) {
	opt = opt || {};
	opt.__root = opt.__root || p.resolve('.');
	opt.__modroot = opt.__modroot || p.join(opt.__root, name);

	var verbose = opt.verbose;

	var app = express(),
		mod = require(p.join(opt.__modroot, 'config')),
		engine = mod.engine || 'jade',
		views = mod.views,
		before = mod.useBeforeController,
		after = mod.useAfterController,
		submod = p.join(opt.__modroot, 'modules');

	verbose && console.log('\n load module: %s', name);

	app.set('view engine', engine);
	app.set('views', views);

	if (before) before.forEach(function (fn) {
		app.use(fn);
	});

	//loadControllers
	loadControllers(app, opt);

	//load submodule
	if (fs.existsSync(submod)) {
		fs.readdirSync(submod).forEach(function (subname) {
			var n = opt.__parent ? p.join(opt.__parent, subname): subname,
				newopt = merge({ __modroot: p.join(submod, subname), __parent: n }, opt);

			app.use('/' + subname, run(n, newopt));
		});
	}

	if (after) after.forEach(function (fn) {
		app.use(fn);
	});

	return app;
};
