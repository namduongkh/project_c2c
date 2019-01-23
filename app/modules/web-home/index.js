'use strict';

const HomeController = require('./controllers/home.controller.js');

exports.register = function(server, options, next) {
    var configManager = server.plugins['hapi-kea-config'];

    server.route({
        method: 'GET',
        path: '/',
        config: HomeController.index
    });

    server.route({
        method: 'POST',
        path: '/api/contact',
        config: HomeController.contact
    });

    next();
};

exports.register.attributes = {
    name: 'web-home'
};