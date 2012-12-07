var express = require('express'),
	jade = require('jade'),
	fs = require('fs'),
	app = express(),
	viewOptions = { compileDebug: false, self: true };

//data
var db = {
		users: [ 
			{ id: 0, name: 'Jo', age: 20, sex: 'm' },
			{ id: 1, name: 'Bo', age: 19, sex: 'm' },
			{ id: 2, name: 'Le', age: 18, sex: 'w' }
		],
		titles: {
			'/users': 'Список пользователей',
			'/users/profile': 'Профиль пользователя'
		}
	};

//utils
function merge(a, b) {
	var key;
	
	if (a && b) {
		for (key in b) {
			a[key] = b[key];
		}
	}
	
	return a;
}
	
//App settings	
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('title', 'Мой сайт');
app.locals.compileDebug = viewOptions.compileDebug;
app.locals.self = viewOptions.self;

app.use(express.static(__dirname + '/public'));
//Заменяем рендер
app.use(function replaceRender(req, res, next) {
	var render = res.render,
		view = /^\/.+/.test(req.path) ? req.path.substr(1).split('/'): [];
		
	res.render = function(v, o) {
		res.render = render;
		
		var data;
		
		if ('string' === typeof v) {	
			view = view.concat(v.split('/'));
			data = o;
		} else {
			data = v;
		}
		
		data = merge(data || {}, res.locals);
		
		if (req.xhr) {
			res.json({ data: data, view: view.join('.') });
		} else {
			data.state = JSON.stringify({ data: data, view: view.join('.') });
			view[view.length - 1] = '_' + view[view.length - 1];
			res.render(view.join('/'), data);
		}
	};
	
	next();
});
//Загружаем заголовок страници
app.use(function loadPageTitle(req, res, next) {
	var pageTitle = db.titles[req.path];
	res.locals.title = app.get('title') + (pageTitle ? ' - ' + pageTitle: '');
	next();
});

app.use(app.router);
app.use(express.errorHandler());

//routes
app.get('/', function(req, res){
	res.render('index');
});

app.get('/users', function(req, res){
	var data = { users: db.users };
	res.render('index', data);
});

app.get('/users/profile', function(req, res){
	var data = { user: db.users[req.query.id] };
	res.render(data);
});


//
function loadTemplate(viewpath) {
	var fpath = app.get('views') + viewpath,
		str = fs.readFileSync(fpath, 'utf8');
	
	viewOptions.filename = fpath;
	viewOptions.client = true;
	
	return jade.compile(str, viewOptions).toString();	
}

app.get('/templates', function(req, res) {
	
	var str = 'var views = { '
			+	'"index": (function(){ return ' + loadTemplate('/index.jade')  + ' }()),'
			+	'"users.index": (function(){ return ' + loadTemplate('/users/index.jade')  + ' }()),'
			+	'"users.profile": (function(){ return ' + loadTemplate('/users/profile.jade')  + ' }())'
			+ '};'

	res.set({ 'Content-type': 'text/javascript' }).status(200).send(str);
});

app.listen(3000);