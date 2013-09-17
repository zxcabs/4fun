/**
 * Created with JetBrains WebStorm.
 * User: reznichenko
 *
 */


angular
    .module('App.service.Tasks', ['ngResource'])
    .factory('Tasks', ['$resource', function ($resource) {
        return $resource('tasks', {}, {
            query: {
                method: 'GET',
                params: {},
                isArray: true
            },
            create: {
                method: 'POST'
            }
        });
    }])
    .factory('Task', ['$resource', function ($resource) {
        return $resource('task/:id', {}, {
            delete: {
                method: 'DELETE'
            }
        });
    }]);