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
                isArray: false
            }
        });
    }]);
