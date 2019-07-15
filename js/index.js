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
  $('.modal').on('shown.bs.modal', function (e) {
    $('.img-slider').resize();
  });
  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  $('body').on('hidden.bs.modal', function () {
    if ($('.modal.in').length > 0) {
      $('body').addClass('modal-open');
    }
  });
  $(document).ready(function () {

    $('.modal').on("hidden.bs.modal", function (e) { //fire on closing modal box
      if ($('.modal:visible').length) { // check whether parent modal is opend after child modal close
        $('body').addClass('modal-open'); // if open mean length is 1 then add a bootstrap css class to body of the page
      }
    });
  });
  $(document).ready(function () {


    $(document).on('show.bs.modal', '.modal', function (event) {
      var zIndex = 1040 + (10 * $('.modal:visible').length);
      $(this).css('z-index', zIndex);
      setTimeout(function () {
        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
      }, 0);
    });


  });
  $('.img-slider').slick('setPosition');
  //this code segment will activate parent modal dialog 
  //after child modal box close then scroll problem will automatically fixed

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
  var modalShrink = function () {
    if ($(window).width < 768) {
      $("modal-dialog").addClass("modal-dialog-shrink");
    }
  };
  $("#navbar-btn").click(function () {
    var elemento = document.getElementById('mainNav');
    if (!elemento.classList.contains("black-on-show")) {
      $("#mainNav").addClass("black-on-show");
    }
    else {
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
  // Initialize and add the map
  var initMap = function () {
    // The location of Uluru
    var uluru = { lat: -23.4960314, lng: 46.8878587};
    // The map, centered at Uluru
    var map = new google.maps.Map(
      document.getElementById('map'), { zoom: 17, center: uluru });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({ position: uluru, map: map });
  }
  initMap();


})(jQuery); // End of use strict
