function Touchscroll(container,content,options) {
    //滚动条颜色
    var bg = options && options.bg ? options.bg : 'rgba(0,0,0,.7)';
    //滚动条宽度
    var scrollBarWidth = options && options.width ? options.width : 6;
    var moveCallback = options && options.move ? options.move : null;



    var app = document.querySelector(container);
    var content = app.querySelector(content);
    //创建滚动条
    var scrollBar = document.createElement('div');
    app.appendChild(scrollBar);

    // var html = '';
    // for (var i = 1; i <= 100; i++){
    //     html += i + '<br>';
    // }
    // content.innerHTML = html;

    //绑定触摸开始事件
    app.addEventListener('touchstart',function (e) {
        this.y = e.touches[0].clientY;
        this.top = transformCSS(content,'translateY');

        this.startTime = Date.now();
        //即点即停
        if (content.timer && content.timer['translateY']){
            clearInterval(content.timer['translateY']);
        }
        if (scrollBar.timer && scrollBar.timer['translateY']){
            clearInterval(scrollBar.timer['translateY']);
        }
    })

    //绑定触摸移动事件
    app.addEventListener('touchmove',function (e) {
        this._y = e.touches[0].clientY;
        this.translateY = this._y - this.y + this.top;
        transformCSS(content,'translateY',this.translateY);

        //设置滚动条移动位置
        var scrollBarTop = -app.offsetHeight * this.translateY / content.offsetHeight;
        transformCSS(scrollBar,'translateY',scrollBarTop);

        if (options && typeof options.move === 'function'){
            options.move();
        }
    });

    //绑定触摸结束事件
    app.addEventListener('touchend',function (e) {
        //获取当前的 translateY
        var currentTranslateY = transformCSS(content,'translateY');
        // 计算 路程 时间 速度
        this._y = e.changedTouches[0].clientY;
        var disY = this._y - this.y;
        this.endTime = Date.now();
        var disTime = this.endTime - this.startTime;
        var v = disY / disTime;
        var s = v * 120;

        // 计算最终的元素位置
        var translateY = currentTranslateY + s;
        // 先声明一个变量
        var type = 'easeOut';
        if (translateY >= 0){
            translateY = 0;
            type = 'backEaseOut';
        }else if (translateY <= app.offsetHeight - content.offsetHeight) {
            translateY = app.offsetHeight - content.offsetHeight;
            type = 'backEaseOut';
        };
        tweenAnimation(content,'translateY',currentTranslateY,translateY,500,10,type);

        //计算滚动条的位置
        var scrollBarTop = -app.offsetHeight * translateY / content.offsetHeight;
        var currentScrollBarTop = transformCSS(scrollBar,'translateY');
        tweenAnimation(scrollBar,'translateY',currentScrollBarTop,scrollBarTop,500,10,type);

        //执行回调
        if (options && typeof options.end === 'function'){
            options.end();
        }
    });

    //初始化
    this.init = function () {
        // 初始化 父级元素 相对定位
        app.style.position = 'relative';

        scrollBar.className = 'scroll-bar';
        scrollBar.style.position = 'absolute';
        scrollBar.style.right = 0;
        scrollBar.style.top = 0;
        scrollBar.style.width = scrollBarWidth + 'px';
        scrollBar.style.borderRadius = scrollBarWidth/2 + 'px';
        scrollBar.style.background = bg;
        //将滚动条插入到 app 容器中
        app.appendChild(scrollBar);

        //计算滚动条的高度
        var h = app.offsetHeight / content.offsetHeight * app.offsetHeight;
        scrollBar.style.height = h + 'px';
    }
    this.init();

}