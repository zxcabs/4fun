/**
 * Created with JetBrains WebStorm.
 * User: reznichenko
 *
 */

angular
    .module('App.controllers.CList',
        [
            'App.service.Tasks'
        ]
    )
    .controller('CList', ['$scope', 'Tasks', 'Task', function ($scope, Tasks, Task) {
        $scope.items = Tasks.query();

        $scope.$on('new task', function (event, task) {
            Tasks.create(task, function () {
                $scope.items = Tasks.query();
            });
        });

        $scope.delTask = function delTask(id) {
            Task.delete({ id: id }, function () {
                $scope.items = Tasks.query();
            });

        };
    }]);