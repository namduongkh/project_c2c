'use strict';

let publicPath = process.env.NODE_ENV == "development" ? "public/src" : "public/dist";

module.exports = {
    assets: {
        required: [
            // 'script-loader?!jquery',
            // 'jquery-mousewheel',
            // 'tether',
            // 'bootstrap',
            // 'script-loader?!magnific-popup',
            // 'bootstrap-daterangepicker',
            // 'flatpickr',
            // 'cropper',
            /////////////////
            // 'bootstrap/dist/css/bootstrap.css',
            // 'font-awesome/scss/font-awesome.scss',
            // 'magnific-popup/src/css/main.scss',
            // 'cropper/dist/cropper.css',
            // 'froala-editor/css/froala_editor.pkgd.min.css',
            // 'froala-editor/css/froala_style.min.css',
            // 'jsoneditor/dist/jsoneditor.min.css'
        ],
        include: {
            css: [
                'public/vendor/bootstrap/css/bootstrap.min.css',
                'public/vendor/fontawesome-free/css/all.min.css',
                'https://fonts.googleapis.com/css?family=Montserrat:400,700',
                'https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic',
                'public/vendor/magnific-popup/magnific-popup.css',
                publicPath + '/styles/main.css',
            ],
            js: [
                'public/vendor/jquery/jquery.min.js',
                'public/vendor/bootstrap/js/bootstrap.bundle.min.js',
                'public/vendor/jquery-easing/jquery.easing.min.js',
                'public/vendor/magnific-popup/jquery.magnific-popup.min.js',
                publicPath + '/scripts/main.js',
            ]
        }
    }
}
