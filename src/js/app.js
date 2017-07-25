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

    const LENGTH = 6
    let page = 0
    $('#portfolio .more').on('click', function() {
        page++
        $.ajax({
            url: '/getProducts',
            dataType: 'json',
            method: 'GET',
            data: {
                page: page,
                length: LENGTH
            }
        }).then(function(response) {
            data = response.data
            console.log(data)
            appendHtml(data)
        }, function() {
            alert('Data is missing!')
        })
    })


    function appendHtml(response) {
        var portfolio = $('.portfolio-list')
        var html = '';
        [].forEach.call(response, function(item) {
            html += `<li class="portfolio-item">
                        <a href="javascript:void(0);">
                            <div class="mask"></div>
                            <img src="${item.thumb_large_url}" alt="milk">
                        </a>
                        <h4 class="item-name">${item.abs}</h4>
                        <p class="portfolio-description">${item.author}</p>
                    </li>`
        });
        portfolio.append(html)
    }
})