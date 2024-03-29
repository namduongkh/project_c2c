'use strict';
const CoreController = require('./controller/core.controller.js');


exports.register = function(server, options) {
    var configManager = server.configManager;

    server.ext('onPostHandler', CoreController.getCredentials);
    // server.ext('onPostHandler', CoreController.getSocialInfo);
    // server.ext('onPostHandler', CoreController.getHostInfo);
    // server.ext('onPostHandler', CoreController.getGACode);
    // server.ext('onPostHandler', CoreController.getPostCategories);
    // server.ext('onPostHandler', CoreController.getProductCategories);
    server.ext('onPostHandler', CoreController.getMeta);
    // server.ext('onPostHandler', CoreController.getMetaImage);
    // server.ext('onPostHandler', CoreController.getSticker);
    server.ext('onPreResponse', CoreController.handleError);
    // server.ext('onPreHandler', CoreController.getPushToken);

    // let mongoCache = require('./util/mongoCache')(server, options);
    // let getSticker = require('./util/getSticker')(server, options);
    // let core = require('./util/core')();
    // server.expose('mongoCache', mongoCache);
    // server.expose('getSticker', getSticker.getSticker);
    // server.expose('allowCollection', core.allowCollection);

    server.route({
        method: 'GET',
        path: '/404.pn',
        config: CoreController.notFound
    });
};

exports.register.attributes = {
    name: 'web-core'
};