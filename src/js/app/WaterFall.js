define(['jquery'], function($) {
    var waterFall = (function() {
        function _waterFall($item) {
            this.$item = $item
            this.$waterFall = this.$item.parent()
            this.$columnWidth = this.$waterFall.children().outerWidth(true)
            this.$columnNumber = Math.floor(this.$waterFall.width() / this.$columnWidth)
            this.columnHeight = []
            this.minIndex = 0
            this._init()
            this._layout()
        }

        _waterFall.prototype = {
            _init: function() {
                debugger
                if (this.columnHeight.length === 0) {
                    for (let i = 0; i < this.$columnNumber; i++) {
                        this.columnHeight.push(0)
                    }
                }
            },
            _layout: function() {
                let minHeight = this.columnHeight[this.minIndex]
                $(this.columnHeight).each((index, columnItem) => {

                    if (this.columnHeight[index] < minHeight) {

                        this.minIndex = index
                        minHeight = this.columnHeight[index]
                    }
                })
                debugger
                this.$item.css({
                    left: this.$columnWidth * this.minIndex,
                    top: minHeight,
                });
                this.columnHeight[this.minIndex] = this.$item.outerHeight(true) + this.columnHeight[this.minIndex]
            }
        }

        function init($item) {

            $item.each(function() {
                var $this = $(this)
                if ($this.hasClass('init')) return
                new _waterFall($this, $item)
                $this.addClass('init')
            })
        }

        return {
            init: init
        }

    })()

    return waterFall
})