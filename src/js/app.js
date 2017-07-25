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

require(['jquery', 'app/BackTop', 'app/Carousel', 'app/Exposure', 'app/WaterFall'], function($, BackTop, Carousel, Exposure, WaterFall) {
    Carousel.init($('.carousel'))
    BackTop.init($('#back-top'))

    const LENGTH = 6
    let page = 0
    $('#portfolio .more').on('click', function() {
        getData(function(data) {
            $(data).each((index, item) => {
                var $item = render(item)

                $item.find('img').on('load', function() { //JS是异步的，所以要在DOM加载完毕后再开始计算插入节点的位置  这里是图片加载完毕再计算每一列的高度的意思
                    console.log('图片加载完')
                    $('.portfolio-list').append($item)
                    WaterFall.init($item)
                        // console.log(WaterFall.init)
                })
            })

        })
    })

    function getData(callback) {
        $.ajax({
            url: '/getProducts',
            dataType: 'json',
            method: 'GET',
            data: {
                page: page,
                length: LENGTH
            }
        }).then(function(response) {
            if (response.status === 0) {
                data = response.data
                callback(data)
            } else {
                alert('后台完蛋了！')
            }
            page++
        }, function() {
            alert('Data is missing!')
        })
    }

    function render(item) {
        let html = `<li class="portfolio-item">
                        <a href="javascript:void(0);">
                            <div class="mask"></div>
                            <img src="${item.image_url}" alt="milk">
                        </a>
                        <h4 class="item-name">${item.abs}</h4>
                        <p class="portfolio-description">${item.abs}</p>
                    </li>`
        return $(html)
    }
})