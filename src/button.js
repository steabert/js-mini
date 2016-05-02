var jquery = require('jquery');

var button = jquery('<button/>')
                .html('click me')
                .on('click', function() {
                    alert('You pressed me!');
                });

module.exports = button;
