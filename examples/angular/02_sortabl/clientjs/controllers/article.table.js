/**
 * Created with JetBrains WebStorm.
 * User: reznichenko
 *
 */


require('../service/articles.js');

angular
    .module('ArticlesApp.controllers', ['App.services'])
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