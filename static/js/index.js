! function(n) {
    "use strict";
    var a = !1;
    n('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
            var a = n(this.hash);
            if ((a = a.length ? a : n("[name=" + this.hash.slice(1) + "]")).length) return n("html, body").animate({
                scrollTop: a.offset().top - 54
            }, 1e3, "easeInOutExpo"), !1
        }
    }), n(".modal").on("shown.bs.modal", function(a) {
        n(".img-slider").resize()
    }), n(".js-scroll-trigger").click(function() {
        n(".navbar-collapse").collapse("hide")
    }), n("body").on("hidden.bs.modal", function() {
        0 < n(".modal.in").length && n("body").addClass("modal-open")
    }), n(document).ready(function() {
        n(".modal").on("hidden.bs.modal", function(a) {
            n(".modal:visible").length && n("body").addClass("modal-open")
        })
    }), n(document).ready(function() {
        n(document).on("show.bs.modal", ".modal", function(a) {
            var o = 1040 + 10 * n(".modal:visible").length;
            n(this).css("z-index", o), setTimeout(function() {
                n(".modal-backdrop").not(".modal-stack").css("z-index", o - 1).addClass("modal-stack")
            }, 0)
        })
    }), n(".img-slider").slick("setPosition"), n("body").scrollspy({
        target: "#mainNav",
        offset: 56
    });
    var o = function() {
        a = 250 < n(window).scrollTop() ? (a || n(".navbar").hide(), n("#mainNav").addClass("navbar-shrink"), n("#logo").addClass("logo-shrink"), n("#mainNav").removeClass("top"), n("#mainNav").addClass("fixed-top"), n(".navbar").fadeIn(300), !0) : (n("#mainNav").removeClass("navbar-shrink"), n("#logo").removeClass("logo-shrink"), n("#mainNav").removeClass("fixed-top"), n("#mainNav").addClass("top"), n(".navbar").show(), !1)
    };
    n("#navbar-btn").click(function() {
        document.getElementById("mainNav").classList.contains("black-on-show") ? n("#mainNav").removeClass("black-on-show") : n("#mainNav").addClass("black-on-show")
    }), o(), n(window).scroll(o), n(".portfolio-modal").on("show.bs.modal", function(a) {
        n(".navbar").addClass("d-none")
    }), n(".portfolio-modal").on("hidden.bs.modal", function(a) {
        n(".navbar").removeClass("d-none")
    });
}(jQuery);