/**
 * Created with JetBrains WebStorm.
 * User: reznichenko
 *
 */


angular
    .module('App.controllers.CMain',
        ['App.controllers.CList']
    )
    .controller('CMain', ['$scope', function ($scope) {
        $scope.newTask = {};

        $scope.addTask = function addTask() {
            if (!$scope.newTask) return;

            $scope.$broadcast('new task', $scope.newTask);
            $scope.newTask = {};
        };
    }]);