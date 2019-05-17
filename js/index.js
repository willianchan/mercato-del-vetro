(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
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
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 56
  });

  

  // Collapse Navbar
 var navbarCollapse = function() {
    if ($(window).scrollTop()>450) {
      document.getElementById('showNavBar').innerHTML =  '<nav class="navbar navbar-expand-lg navbar-dark navbar-shrink fixed-top" id="mainNav">\
      <div class="container">\
          <a class="js-scroll-trigger" href="#page-top"><img class="logo-shrink" id="logo"\
                  src="./img/logo_del_vetro.png"></a>\
          <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"\
              data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"\
              aria-label="Toggle navigation">\
              Menu\
              <i class="fas fa-bars"></i>\
          </button>\
          <div class="collapse navbar-collapse" id="navbarResponsive">\
              <ul class="navbar-nav text-uppercase ml-auto">\
                  <li class="nav-item">\
                      <a class="nav-link js-scroll-trigger" href="#servicos">Serviços</a>\
                  </li>\
                  <li class="nav-item">\
                      <a class="nav-link js-scroll-trigger" href="#vidros">Vidros</a>\
                  </li>\
                  <li class="nav-item">\
                      <a class="nav-link js-scroll-trigger" href="#produtos">Produtos</a>\
                  </li>\
                  <li class="nav-item">\
                      <a class="nav-link js-scroll-trigger" href="#sobre">Sobre</a>\
                  </li>\
                  <li class="nav-item">\
                      <a class="nav-link js-scroll-trigger" href="#contato">Contato</a>\
                  </li>\
              </ul>\
          </div>\
      </div>\
  </nav>';
      //$("#mainNav").addClass("navbar-shrink");
      //$("#mainNav").addClass("fixed-top");
      //$("#logo").addClass("logo-shrink");
    } else if($(window).scrollTop()<450){
      document.getElementById('showNavBar').innerHTML =  '';
      //$removeShrunkNav();
      //$("#mainNav").removeClass("navbar-shrink");
      //$("#mainNav").removeClass("fixed-top");
      //$("#logo").removeClass("logo-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Hide navbar when modals trigger
  $('.portfolio-modal').on('show.bs.modal', function(e) {
    $('.navbar').addClass('d-none');
  })
  $('.portfolio-modal').on('hidden.bs.modal', function(e) {
    $('.navbar').removeClass('d-none');
  })

})(jQuery); // End of use strict
