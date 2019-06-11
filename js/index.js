(function ($) {
  "use strict"; // Start of use strict

  var isNavBarShown = false;

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 56
  });

  // Collapse Navbar
  var navbarCollapse = function () {
    if ($(window).scrollTop() > 250) {
      if (!isNavBarShown) {
        $(".navbar").hide();
      }
      $("#mainNav").addClass("navbar-shrink");
      $("#logo").addClass("logo-shrink");
      $("#mainNav").removeClass("top");
      $("#mainNav").addClass("fixed-top");
      $('.navbar').fadeIn(300);
      isNavBarShown = true;
    }
    else {
      $("#mainNav").removeClass("navbar-shrink");
      $("#logo").removeClass("logo-shrink");
      $("#mainNav").removeClass("fixed-top");
      $("#mainNav").addClass("top");
      $(".navbar").show();
      isNavBarShown = false;
    }
  };
  var modalShrink = function(){
    if($(window).width<768){
      $("modal-dialog").addClass("modal-dialog-shrink");
    }
  };
  $("#navbar-btn").click(function(){
    var elemento = document.getElementById('mainNav');
    if(!elemento.classList.contains("black-on-show")){
      $("#mainNav").addClass("black-on-show");
    }
    else{
      $("#mainNav").removeClass("black-on-show");
      
      
      
    }
  });
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Hide navbar when modals trigger
  $('.portfolio-modal').on('show.bs.modal', function (e) {
    $('.navbar').addClass('d-none');
  })
  $('.portfolio-modal').on('hidden.bs.modal', function (e) {
    $('.navbar').removeClass('d-none');
  })

})(jQuery); // End of use strict
