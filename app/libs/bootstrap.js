'use strict';

import Path from 'path';
import Glob from 'glob';
import _ from 'lodash';
import { minify } from 'html-minifier';
import CustomFilter from "../utils/custom_filters";
import Ejs from 'ejs';
import LRU from 'lru-cache';
Ejs.cache = LRU(100); // LRU cache with 100-item limit

module.exports = function (server) {
    server.register([{
        register: require('vision')
    }, {
        register: require('inert')
    }, {
        // Kết nối mongodb
        register: require('./mongo.js')
    }, {
        // Plugin xử lý để load các file tĩnh
        register: require('./static.js')
    }, {
        // Plugin xử lý xác thực user
        register: require('./auth.js')
    }], (err) => {
        if (err) {
            server.log(['error', 'server'], err);
        }
        let config = server.configManager;

        // Cài đặt template engine: Đang sử dụng nunjucks
        // server.views({
        //     engines: {
        //         html: {
        //             compile: function (src, options) {
        //                 src = `
        //                 <% extends 'views/layouts/layout.html' %>
        //                 <% block content %>
        //                 ${src}
        //                 <% endblock %>
        //                 `;
        //                 var template = Nunjucks.compile(src, options.environment);
        //                 return function (context) {
        //                     var content = template.render(context);
        //                     let htmlCompress = config.get('web.htmlCompress');
        //                     if (htmlCompress) {
        //                         var result = minify(content, {
        //                             removeAttributeQuotes: true,
        //                             removeComments: true,
        //                             collapseWhitespace: true
        //                         });
        //                         return result;
        //                     }
        //                     return content;
        //                 };
        //             },
        //             prepare: function (options, next) {
        //                 options.compileOptions.environment = Nunjucks.configure(options.path, {
        //                     tags: {
        //                         blockStart: '<%',
        //                         blockEnd: '%>',
        //                         variableStart: '<$',
        //                         variableEnd: '$>',
        //                         commentStart: '<#',
        //                         commentEnd: '#>'
        //                     },
        //                     watch: false
        //                 });
        //                 _.forEach(CustomFilter, (f, name) => {
        //                     options.compileOptions.environment.addFilter(name, f);
        //                 });
        //                 return next();
        //             }
        //         }
        //     },
        //     path: Path.join(BASE_PATH + '/app'),
        //     context: config.get('web.context')
        // });

        server.views({
            engines: { html: Ejs },
            relativeTo: global.BASE_PATH + '/app/modules',
            layoutPath: global.BASE_PATH + '/app/views/layouts',
            layout: true,
            context: config.get('web.context')
        });

        // Load các models
        let models = Glob.sync(BASE_PATH + "/app/modules/*/model/*.js", {});
        models.forEach((item) => {
            require(Path.resolve(item));
        });

        // Tùy theo từng connection của từng label mà load các route trong các module thuộc label đó vào
        server.connections.forEach(function (connectionSetting) {
            let labels = connectionSetting.settings.labels;
            labels.forEach(name => {
                let modules = [];
                let modulesName = Glob.sync(BASE_PATH + `/app/modules/${name}-*/index.js`, {});
                modulesName.forEach((item) => {
                    modules.push(require(Path.resolve(`${item}`)));
                });
                if (modules.length) {
                    server.register(modules, { select: [name] }, (err) => {
                        if (err) {
                            server.log(['error', 'server'], err);
                        }
                    });
                }
            });
        });

    });
};