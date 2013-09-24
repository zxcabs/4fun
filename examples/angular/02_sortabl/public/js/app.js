;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./controllers/article.table.js":2}],2:[function(require,module,exports){
/**
 * Created with JetBrains WebStorm.
 * User: reznichenko
 *
 */


require('../service/articles.js');

angular
    .module('ArticlesApp.controllers', ['App.service.Articles'])
    .controller('ArticleTable', ['$scope', 'Articles', '$window', function($scope, Articles, $window) {
        $scope.articles = [];
        $scope.count = 10;

        //
        angular.element($window).on('scroll', function () {
            var $el = angular.element('#list'),
                $w = angular.element($window),
                wh = $w.height(),
                eh = $el.height(),
                st = $w.scrollTop();

            if (0 > eh - wh - st) {
                $scope.getMore();
            }
        });

        $scope.getMore = function () {
            Articles.query({ from: $scope.articles.length, count: $scope.count }, function (articles) {
                $scope.articles = $scope.articles.concat(articles);
            });
        };

        $scope.getMore();
    }]);
},{"../service/articles.js":3}],3:[function(require,module,exports){
/**
 * Created with JetBrains WebStorm.
 * User: reznichenko
 *
 */

angular
    .module('App.service.Articles', ['ngResource'])
    .factory('Articles', ['$resource', function ($resource) {
        return $resource('api/articles', {}, {
            query: {
                method: 'get',
                params: { count: 50, from: 0 },
                transformResponse: function (data, header) {
                    data = angular.fromJson(data);
                    return data.articles;
                },
                isArray: true,
                responseType: 'json'
            }
        });
    }]);

},{}]},{},[1])
;