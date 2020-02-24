$(".slider").slick({
    dots: !1,
    infinite: !1,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 1200,
        settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: !1,
            dots: !0
        }
    }, {
        breakpoint: 992,
        settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: !1,
            dots: !0
        }
    }, {
        breakpoint: 768,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: !1,
            dots: !0
        }
    }, {
        breakpoint: 576,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: !1
        }
    }]
}), $(".img-slider").slick({
    dots: !1,
    infinite: !0,
    speed: 500,
    fade: !0,
    cssEase: "linear",
    initialSlide: 3
});