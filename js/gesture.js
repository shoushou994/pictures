(function (w) {
    function gesture(el, callback) {
        //增加自定义属性
        el.hasGestureStartTriggered = false;
        // el 绑定 手势事件  模拟手势开始事件
        el.addEventListener('touchstart', function (e) {
            if (e.touches.length >= 2) {
                //手势开始的事件处理程序
                callback.start(e);
                el.hasGestureStartTriggered = true;
                //计算两个触点的直线距离 pow
                this.initDis = getTouchesDis(e.touches[0], e.touches[1]);
                // 获取角度
                this.initJiaodu = getTouchesJiaJiao(e.touches[0], e.touches[1]);
            }
        });

        //模拟手势改变事件
        el.addEventListener('touchmove', function (e) {
            if (e.touches.length >= 2) {
                //计算两个触点的直线距离 pow
                this.moveDis = getTouchesDis(e.touches[0], e.touches[1]);
                //计算比例
                e.scale = this.moveDis / this.initDis;
                //计算夹角  e.rotation
                //计算起始状态的夹角
                this.moveJiaodu = getTouchesJiaJiao(e.touches[0], e.touches[1]);
                //计算角度差
                var jiaodu = this.moveJiaodu - this.initJiaodu;
                e.rotation = jiaodu;
                callback.change(e);
            }
        });

        //模拟手势结束事件
        el.addEventListener('touchend', function (e) {
            if (e.touches.length < 2 && el.hasGestureStartTriggered) {
                //执行手势结束事件的回调
                callback.end();
                el.hasGestureStartTriggered = false;
            }
        })
    }

    // 返回两个触点之间的间距
    function getTouchesDis(t1, t2) {
        var disX = t1.clientX - t2.clientX;
        var disY = t1.clientY - t2.clientY;
        //计算两个触点的直线距离 pow
        return Math.sqrt(disX * disX + disY * disY);
    }

    // 计算两个触点行程的夹角
    function getTouchesJiaJiao(t1, t2) {
        //计算起始状态的夹角
        var disX = t1.clientX - t2.clientX;
        var disY = t1.clientY - t2.clientY;

        //单位为弧度
        var du = Math.atan2(disY, disX);
        //弧度转为角度  2πR = 周长    1弧度 = 180 / π
        //                             0.5   = ??
        return du * 180 / Math.PI;
    }

    w.gesture = gesture;
})(window)