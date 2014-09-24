/**
 * @author "Evgeny Reznichenko" <kusakyky@gmail.com>
 */


var
    ugl = require('uglify-js'),
    ast = ugl.parse('var MySuperClass = My.class.base.extend();', { filename: 'name.js', toplevel: null });

console.log(ast);
