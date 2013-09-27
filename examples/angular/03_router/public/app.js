/**
 * Project: 4fun
 * File:
 * User: Evgeny Reznichenko "<kusakyky@gmail.com>"
 */


angular
    .module('AppRouter', ['ngRoute'])
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
            .when('/:param', { templateUrl: 'tempalte.html', controller: 'SecondCtrl' })
            .otherwise({ redirectTo: '/blabla' });
    }]);