/**
 * @author "Evgeny Reznichenko" <kusakyky@gmail.com>
 */


var
    Promise = require('lib/promise');
/**
 * @returns {defer}
 */
module.exports = function defer() {
    return Promise.defer();
};