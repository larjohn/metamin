// Autosize 1.15.2 - jQuery plugin for textareas
// (c) 2013 Jack Moore - jacklmoore.com
// license: www.opensource.org/licenses/mit-license.php
(function (a) {
    var j, b = {className: "autosizejs", append: "", callback: !1}, c = "hidden", d = "border-box", e = "lineHeight", f = '<textarea tabindex="-1" style="position:absolute; top:-9999px; left:-9999px; right:auto; bottom:auto; border:0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden;"/>', g = ["fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "textTransform", "wordSpacing", "textIndent"], h = "oninput", i = "onpropertychange", k = a(f).data("autosize", !0)[0];
    k.style.lineHeight = "99px", "99px" === a(k).css(e) && g.push(e), k.style.lineHeight = "", a.fn.autosize = function (e) {
        return e = a.extend({}, b, e || {}), k.parentNode !== document.body && a(document.body).append(k), this.each(function () {
            function s() {
                j = b, k.className = e.className, a.each(g, function (a, b) {
                    k.style[b] = f.css(b)
                })
            }

            function t() {
                var a, d, g;
                j !== b && s(), n || (n = !0, k.value = b.value + e.append, k.style.overflowY = b.style.overflowY, g = parseInt(b.style.height, 10), k.style.width = f.width() + "px", k.scrollTop = 0, k.scrollTop = 9e4, a = k.scrollTop, a > m ? (a = m, d = "scroll") : l > a && (a = l), a += p, b.style.overflowY = d || c, g !== a && (b.style.height = a + "px", r && e.callback.call(b)), setTimeout(function () {
                    n = !1
                }, 1))
            }

            var n, o, b = this, f = a(b), l = f.height(), m = parseInt(f.css("maxHeight"), 10), p = 0, q = b.value, r = a.isFunction(e.callback);
            f.data("autosize") || ((f.css("box-sizing") === d || f.css("-moz-box-sizing") === d || f.css("-webkit-box-sizing") === d) && (p = f.outerHeight() - f.height()), o = "none" === f.css("resize") ? "none" : "horizontal", f.css({overflow: c, overflowY: c, wordWrap: "break-word", resize: o}).data("autosize", !0), m = m && m > 0 ? m : 9e4, i in b ? h in b ? b[h] = b.onkeyup = t : b[i] = t : (b[h] = t, b.value = "", b.value = q), a(window).resize(t), f.bind("autosize", t), t())
        })
    }
})(window.jQuery || window.Zepto);