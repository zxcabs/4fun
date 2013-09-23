/**
 * Created with JetBrains WebStorm.
 * User: reznichenko
 *
 */

angular
    .module('ArticleTable', [
        'App.service.Articles'
    ])
    .controller('ArticleTable', ['$scope', 'Articles', '$window', function ($scope, Articles, $window) {
        $scope.articles = [];
        $scope.count = 50;

        //
        angular.element($window).on('scroll', function () {
            
        });

        $scope.getMore = function () {
            Articles.query({ from: $scope.articles.length, count: $scope.count }, function (data) {
                $scope.articles = $scope.articles.concat(data.articles);
            });
        };

        $scope.getMore();
    }]);
