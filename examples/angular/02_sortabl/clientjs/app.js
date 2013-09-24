/**
 * Created with JetBrains WebStorm.
 * User: reznichenko
 *
 */

require('./controllers/article.table.js');

angular
    .module('ArticlesApp', ['ngRoute', 'ArticlesApp.controllers'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/articles', { templateUrl: 'templates/articles.html', controller: 'ArticleTable' })
            .otherwise({ redirectTo: '/articles' });
    }]);