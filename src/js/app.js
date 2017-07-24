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
    Carousel.init($('.carousel'))
    BackTop.init($('#back-top'))
    Exposure.one($('#portfolio'))
    $('#portfolio .more').on('click', function() {
        console.log(1)
        $.ajax({
            url: '/getProducts',
            dataType: 'json',
            method: 'GET',
            data: {
                page: page,
                index: index
            }
        }).then(function(response) {
            console.log(response)
        }, function() {
            alert('Data is missing!')
        })
    })
})