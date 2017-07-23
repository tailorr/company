requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    // except, if the module ID starts with "app",
    // load it from the js/app directory. paths
    // config is relative to the baseUrl, and
    // never includes a ".js" extension since
    // the paths config could be for a directory.
    paths: {
        'app': '../app',
        'jquery': 'jquery.min'
    }
});


require(['jquery', 'app/BackTop', 'app/Carousel', 'app/Exposure'], function($, BackTop, Carousel, Exposure) {
    BackTop.init($('#back-top'))
})