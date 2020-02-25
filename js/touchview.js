
    function Touchview(selector) {
        var el = document.querySelector(selector);

        gesture(el,{
            start:function () {
                this.initScale = transformCSS(el,'scale');
                this.initRotation = transformCSS(el,'rotate');
            },
            change:function (e) {
                //设置元素的显示比例
                transformCSS(el,'scale',e.scale * this.initScale);
                //设置旋转
                transformCSS(el,'rotate',e.rotation + this.initRotation)
            }
        });
    }

