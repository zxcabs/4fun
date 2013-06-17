/**
 * User: jo
 * Date: 14.06.13
 * Time: 17:27
 *
 */

var fs = require('fs'),
	p = require('path'),
	u = require('url'),
	express = require('express'),
	merge = require('./util').merge,
	loadControllers = require('./loadControllers');

function getParentsName(mod, name) {
	var names = [];

	while (mod && !mod.isRoot) {
		names.push(mod.name);
		mod = mod.parent;
	}

	names.push(name);

	return names;
}

module.exports = function loadModule(name, opt, parent) {

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
	strictRouting = config.strict_routing = config.strict_routing || (parent && parent.config.strict_routing) || (root.config.strict_routing || true);
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
			var absolute = '/' + getParentsName(module, subname).join('/') + '/',
				reg = new RegExp('^' + absolute);

			app.use('/' + subname + '/', function (req, res, next) {
				if (reg.test(req.originalUrl)) return next();

				req._parsedUrl.pathname = absolute;
				res.redirect(301, u.format(req._parsedUrl));
			});
			app.use('/' + subname + '/', loadModule(subname, opt, module).app);
		});
	}

	if (after) after.forEach(function (fn) {
		app.use(fn);
	});

	return module;
}
