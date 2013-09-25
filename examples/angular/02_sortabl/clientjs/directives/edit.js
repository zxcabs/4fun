/**
 * Project: 4fun
 * File:
 * User: Evgeny Reznichenko <kusakyky@gmail.com>
 */



angular
    .module('App.directives', [])
    .directive('edit', function () {
        return {
            replace: true,
            scope: {
                article: '=edit'
            },
            templateUrl: 'templates/articleEdit.html',
            controller: function ($scope) {
                var options = $scope.options = {};

                $scope.show = function () {
                    options.isShow = !options.isShow;
                };
            }
        };
    });