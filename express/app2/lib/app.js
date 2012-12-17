var express = require('express'),
	jade = require('jade'),
	fs = require('fs'),
	app = module.exports = express(),
	viewOptions = { compileDebug: false, self: true },
	User = require('./models/index.js').User,
	tools = require('./tools/index.js');

//title
var titles = {
			'/users': 'Список пользователей',
			'/users/profile': 'Профиль пользователя'
		};
	
//App settings	
app.set('views', __dirname + '/../views');
app.set('view engine', 'jade');
app.set('title', 'Мой сайт');
app.locals.compileDebug = viewOptions.compileDebug;
app.locals.self = viewOptions.self;
app.use(express.static(__dirname + '/../public'));
app.use(app.router);
app.use(function (req, res, next) {
	next('not found');
});

//error
app.use(function (err, req, res, next) {
	if (/not found/i.test(err)) {
		res.locals.title = 'Не найдено :(';
		res.render('/errors/notfound');
	} else {
		res.locals.title = 'Ошибка';
		res.render('/errors/error');
	}
});
app.use(express.errorHandler());


//routes

//Заменяем рендер
app.all('*', function replaceRender(req, res, next) {
	var render = res.render,
		view = req.path.length > 1 ? req.path.substr(1).split('/'): [];
		
	res.render = function(v, o) {
		var data,
			title = res.locals.title;
		
		res.render = render;
		res.locals.title = app.get('title') + (title ? ' - ' + title: '');
		//тут мы должны учесть что первым аргументом может придти
		//имя шаблона					
		if ('string' === typeof v) {
			if (/^\/.+/.test(v)) {
				view = v.substr(1).split('/');
			} else {
				view = view.concat(v.split('/'));
			}
			
			data = o;
		} else {
			data = v;
		}

		//в res.locals располагаются дополнительные данные для рендринга
		//Например такие как заголовок страницы (res.locals.title)
		data = tools.merge(data || {}, res.locals);
		
		if (req.xhr) {
			//Если это аякс то отправляем json
			res.json({ data: data, view: view.join('.') });
		} else {
			//Если это не аякс, то сохраняем текущее 
			//состояние (понадобиться для инициализации history api)
			data.state = JSON.stringify({ data: data, view: view.join('.') });
            //И добавляем префикс к шаблону. Далее я расскажу для чего он нужен.
			view[view.length - 1] = '_' + view[view.length - 1];
			//Собственно сам рендер
			res.render(view.join('/'), data);
		}
	};
	
	next();
});


//Загружаем заголовок страници
app.all('*', function loadPageTitle(req, res, next) {
	res.locals.title = titles[req.path];
	next();
});

app.get('/', function(req, res){
	res.render('index');
});

app.get('/users', function(req, res, next){
	User.find(function (err, users) {
		if (err) {
			next(err);
		} else {
			res.render('index', { users: users.toJSON() });
		}
	});
});

app.get('/users/profile', function(req, res, next){
	var id = req.query.id;
	
	User.findById(id, function(err, user) {
		if (user) {
			res.render({ user: user.toJSON() });
		} else {
			next('Not found');
		}
	});
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
			+	'"users.profile": (function(){ return ' + loadTemplate('/users/profile.jade')  + ' }()),'
			+	'"errors.error": (function(){ return ' + loadTemplate('/errors/error.jade')  + ' }()),'
			+	'"errors.notfound": (function(){ return ' + loadTemplate('/errors/notfound.jade')  + ' }())'
			+ '};'

	res.set({ 'Content-type': 'text/javascript' }).send(str);
});