// (操作元素，属性，初始状态，结束状态，过渡持续时间，间隔时间，变化类型)
//示例 (el,'width',200,800,5000,10,'linear');

function tweenAnimation(el,style,init,end,time,jiange,type) {
    //动画切换类型 的函数集合
    var tween = {
        backEaseOut: function (t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeOut: function (t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        linear: function (t, b, c, d) {
            return c * t / d + b;
        }
    };

    // if (type === undefined){
    //     type = 'linear';
    // } else {
    //     type = type;
    // }
    // type 初始化
    var type = type === undefined ? 'linear' : type;

    //初始化参数
    var t = 0;
    var b = init;
    var c = end - init;
    var d = time;
    if (el.timer === undefined){
        el.timer = {};
    }
    //启动定时器
    el.timer[style] = setInterval(function () {
        // 4. 清除定时器
        if (t >= d){
            clearInterval(el.timer[style]);
            return;
        }
        // 1. 时间自增
        t += jiange ;
        // 2. 计算新的值
        var v = tween[type](t,b,c,d);
        // 3. 设置样式  width  height  ---- px
        //     translateX  translateY  scale
        //     opacity
        switch (style) {
            case 'width':
            case 'height':
            case 'left':
            case 'top':
                el.style[style] = v + 'px';
                break;
            case 'translateX':
            case 'translateY':
            case 'translateZ':
            case 'rotate':
            case 'rotateX':
            case 'rotateY':
            case 'rotateZ':
            case 'scale':
            case 'scaleX':
            case 'scaleY':
            case 'scaleZ':
                transformCSS(el,style,v);
                break;
            case 'opacity':
                el.style[style] = v;
                break;
        }

    },jiange);


}