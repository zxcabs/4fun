/**
 * Project: 4fun
 * File:
 * User: Evgeny Reznichenko "<kusakyky@gmail.com>"
 */


angular
    .module('AppRouter', ['ngRoute'])
    .directive('rParam', function () {
        return {
            replace: false,
            scope: {
                'param': '=param'
            },
            template: '<div>{{ name }}: {{ param }}</div>',
            require: ['$scope', '$routeParams'],
            controller: function ($scope, $routeParams) {
                $scope.name = 'Directive';
            }
        };
    })
    .controller('FirstCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
        $scope.routeParams = $routeParams;
    }])
    .controller('SecondCtrl',['$scope', '$routeParams', function ($scope, $routeParams) {
        $scope.routeParams = $routeParams;
    }])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $locationProvider
            .html5Mode(true)
            .hashPrefix('!');

        $routeProvider
            .when('/blabla', { templateUrl: '/tempalte.html', controller: 'SecondCtrl' })
            .when('/blabla/:param', { templateUrl: '/tempalte.html', controller: 'SecondCtrl' })
            .otherwise({ redirectTo: '/blabla' });
    }]);