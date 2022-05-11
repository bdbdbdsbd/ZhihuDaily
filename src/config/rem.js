// 将会在main.js中被引入    <script>
// 这个写法叫匿名函数，就是函数没有确定的名字
// 以下代码定义并立即调用了一个匿名函数
// orientationchange是为了Safari添加的,屏幕旋转的时候会触发
// 当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发
(function(doc,win){
    // HTML 文档返回对象为HTML元素。
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize =  (clientWidth / 3.75) + 'px';
            // console.log(docEl.style.fontSize)
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document,window)