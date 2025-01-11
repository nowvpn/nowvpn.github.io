/*!
 * Table Content :
------------------------
    + Global Variables
    + Loader
    + Hover Effect
    + Owl Carousels
        ---- Carousel Controls Functions
        -------- Carousel Navigation
        -------- Carousel Indicator
        ---- Testimonials Carousel
        ---- Screenshots Carousel
    + Blog Sidebar Categories collapsed
    + Modals Function
        ---- Video Modals
        ---- Image Modals
    + Add Active class to the header links
    + wayPoints plugin function
        ----  jQuery CountTo plugin for Achievements
        ---- Animated home sections
    + CountDown Script from W3C School for Coming Soon
    + Form Validation
    + Contact Form AJAX
    + Scrolling Functions
        ---- Scroll to the top of the page By Top Btn  
        ----  Scroll to Anchors
    + Navbar Actions 
        ---- Scrolling Style
        ---- Show / Hide Navbar

  * Plugins :
-----------------
    + CountDown Script ---- > inspired from : https://www.w3schools.com/howto/howto_js_countdown.asp
    + Ajax Contact Form ---- > inspired from : http://blog.teamtreehouse.com/create-ajax-contact-form
    + Waypoints - 4.0.1 ---- > https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
    + jQuery countTo Plugin  ---- > https://github.com/mhuggins/jquery-countTo
    + Owl.carousel v2.3.4 : https://owlcarousel2.github.io/OwlCarousel2/

 */

/*jshint strict:false */
/*jslint browser: true*/
/*jslint node: true */
/*global $, jQuery, alert*/
/*global alert: false, console: false, jQuery: false */

'use strict';

/* Global Variables  */
var // Scrolling to Anchors
  target = '',
  // Loading to Anchors
  hrefLink = '',
  // Hover Effect EX : app screens
  oldX = 0,
  oldY = 0,
  element_oldTop = 0,
  element_oldLeft = 0,
  // Show / Hide Navbar
  currentScrollValue = 0,
  previousScrollValue = 0,
  // Modals Function
  videoLink = '',
  imgSrc = '',
  // Contact Form AJAX
  form = '',
  formData = '',
  formMessages = '',
  //Add Active class
  url = '',
  pageName = '',
  // wayPoints plugin function
  sections = [],
  // The function of countDown
  targetDate = '';

// Loader
$(window).on('load', function () {
  setTimeout(function () {
    $('#loader').addClass('hide');
    $('main:not(.home)').addClass('show');
  }, 200);
});

$(document).ready(function () {
  // Hover Effect EX : app screens
  (function () {
    $(".hover_moving_effect").on({
      mouseenter: function (e) {
        element_oldTop = $(this).css("top");
        element_oldLeft = $(this).css("left");
        if (e.pageX > oldX) {
          // Detected Right Direction 
          $(this).animate({
            left: "20"
          });
        } else {
          // Detected Left Direction 

          $(this).animate({
            left: "-20"
          });
        }
        if (e.pageY > oldY) {
          // Detected Bottom Direction 

          $(this).animate({
            top: "20"
          });
        } else {
          // Detected Top Direction 

          $(this).animate({
            top: "-20"
          });
        }

        oldX = e.pageX;
        oldY = e.pageY;
      },
      mouseleave: function () {
        $(this).animate({
          top: element_oldTop,
          left: element_oldLeft
        });
      }
    });

  })();

  // Owl Carousels
  (function () {
    /* ------------------------------------
                Carousel Controls Functions
        --------------------------------------*/

    // Carousel Navigation
    function sliderNavigation(carouselElement) {
      // Go to the next item
      carouselElement
        .parents('section')
        .find('.carousel-navigation .next')
        .on('click', function () {
          carouselElement.trigger('next.owl.carousel', [300]);
        });
      // Go to the previous item
      carouselElement
        .parents('section')
        .find('.carousel-navigation .prev')
        .on('click', function () {
          carouselElement.trigger('prev.owl.carousel', [300]);
        });
    }

    // Carousel Indicator
    function sliderIndicator(carouselElement) {
      var indicator_dot = carouselElement
        .parents('section')
        .find('.carousel-indicators .dot');
      indicator_dot.on('click', function () {
        carouselElement.trigger('to.owl.carousel', [$(this).index(), 300]);

        $(this)
          .addClass('active')
          .siblings()
          .removeClass('active');
      });

      carouselElement.on('change.owl.carousel', function (event) {
        var index =
          event.item.index + 1 - event.relatedTarget._clones.length / 2; // Position of the current item

        indicator_dot
          .eq(index)
          .addClass('active')
          .siblings()
          .removeClass('active');
      });
    }

    if ($('.owl-carousel').length > 0) {
      /* ------------------------------------
                    Testimonials Carousel
            --------------------------------------*/

      var testimonials_owl = $('#testimonials-section .owl-carousel');
      // Carousel Settings
      testimonials_owl.owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayHoverPause: true,
        dots: false,
        nav: true,
        navText: ['', ''],
        rtl: $('body').is("[dir='rtl']") ? true : false
      });

      /* ------------------------------------
                Screenshots Carousel
            --------------------------------------*/
      var screenshots_owl = $('#screenshots-section .owl-carousel');
      $("#screenshots-carousel-1 .owl-carousel").owlCarousel({
        items: 3,
        loop: true,
        autoplay: true,
        autoplayHoverPause: true,
        center: true,
        dots: false,
        nav: false,
        rtl: $('body').is("[dir='rtl']") ? true : false,
        responsive: {
          // breakpoint from 0 up
          0: {
            items: 1
          },
          // breakpoint from 480 up
          480: {
            items: 2
          },
          // breakpoint from 768 up
          768: {
            items: 3
          }
        }
      });

      // Screenshot Carousel Style 2
      $("#screenshots-carousel-2 .owl-carousel").owlCarousel({
        items: 6,
        loop: true,
        autoplay: true,
        autoplayHoverPause: true,
        center: true,
        dots: false,
        nav: false,
        rtl: $('body').is("[dir='rtl']") ? true : false,
        margin: 5,
        autoWidth: true,
        responsive: {
          // breakpoint from 0 up
          0: {
            items: 1
          },
          // breakpoint from 480 up
          480: {
            items: 2
          },
          // breakpoint from 768 up
          768: {
            items: 3
          },
          1024: {
            items: 6
          }
        }
      });


      // Set slider navigation
      sliderNavigation(screenshots_owl);
      // Set Slider Indicators
      sliderIndicator(screenshots_owl);
    }
  })();

  // Blog Sidebar Categories collapsed
  (function () {
    $('.categories a[data-toggle=collapse]').on('click', function () {
      $(this)
        .parents('li')
        .siblings('li')
        .find('.collapse')
        .collapse('hide');
    });
  })();

  // Modals Function
  (function () {
    // Video Modals

    $("[data-video-link*='.']").on('click', function () {
      videoLink = $(this).attr('data-video-link');
      $('#video-modal iframe').attr('src', videoLink);
      $('#video-modal').modal();
    });

    // Image Modals
    $('.zoomIn-img img,.zoomIn-img ').on('click', function () {
      imgSrc = $(this).attr('src');
      $('#image-modal img').attr('src', imgSrc);
      $('#image-modal').modal();
    });
    $('#screenshots-carousel .owl-item').on('click', function () {
      imgSrc = $(this)
        .find('img')
        .attr('src');
      $('#image-modal img').attr('src', imgSrc);
      $('#image-modal').modal();
    });
  })();

  // Add Active class to the header links
  (function () {
    // get url address
    url = window.location.pathname.split('/');
    pageName = url[url.length - 1]; // get last part of it

    // set the active class
    $("header a[ href*='" + pageName + "']").addClass('active');
    $('header .dropdown-item.active')
      .parent('.dropdown-menu')
      .siblings('.dropdown-toggle')
      .addClass('active');
  })();

  // wayPoints plugin function
  (function () {
    if ($('main').is('.home')) {
      //  jQuery CountTo plugin for Achievements
      if ($("#achievements-section").length > 0) {
        var waypoint = new Waypoint({
          element: document.getElementById('achievements-section'),
          offset: '45%',
          handler: function () {
            $('.counter').countTo({
              speed: 2000 // Speed of the counter
            });
            this.destroy();
          }
        });
      }

      // Animated home sections
      sections = $(
        '.home #about-section , .home #features-section,.home #howItWorking-section , .home #team-section ,.home #pricing-section, .home #download-section , .home  #fqa-section ,.home #blog-section'
      );
      sections.each(function (i) {
        new Waypoint({
          element: this,
          offset: '25%',
          handler: function () {
            $(sections[i]).toggleClass('show');
            this.destroy();
          }
        });
      });
    }
  })();

  // CountDown Script from W3C School for Coming Soon
  (function () {
    // The function of countDown
    function countDown(targetDate) {
      // Set the date we're counting down to
      var countDownDate = new Date(targetDate).getTime();

      // Update the count down every 1 second
      var x = setInterval(function () {
        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now an the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result
        $('#countDown .days p').text(days);
        $('#countDown .hours p').text(hours);
        $('#countDown .minutes p').text(minutes);
        $('#countDown .seconds p').text(seconds);

        // If the count down is over, write some text
        if (distance < 0) {
          clearInterval(x);
          document.getElementById('countDown').innerHTML = 'EXPIRED';
        }
      }, 1000);
    }
    //get the target date from HTML custom attribute
    targetDate = $('#countDown').attr('data-targetDate');
    //Call the function
    countDown(targetDate);
  })();

  // Form Validation
  (function () {
    window.addEventListener(
      'load',
      function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
          form.addEventListener(
            'submit',
            function (event) {
              if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
              }
              form.classList.add('was-validated');
            },
            false
          );
        });
      },
      false
    );
  })();

  // Contact Form AJAX
  (function () {
    form = $('.contact-form form');
    formData = '';
    formMessages = $('.contact-form .form-messages .alert');
    $(form).submit(function (e) {
      e.preventDefault();
      // Serialize the form data.
      formData = $(form).serialize();
      $.ajax({
          type: 'POST',
          url: $(form).attr('action'),
          data: formData
        })
        .done(function (response) {
          // Make sure that the formMessages div has the 'success' class.
          $(formMessages).removeClass('alert-danger');
          $(formMessages).addClass('alert-success');

          // Set the message text.
          $(formMessages).text(response);

          // Clear the form.
          $('form').trigger('reset');
          $(form).removeClass('was-validated');

          //Show the Message

          $(formMessages).slideDown('slow');
          $('html, body').animate({
              scrollTop: $('.form-messages').offset().top - 200
            },
            1000
          );
          setTimeout(function () {
            $(formMessages).slideUp();
            $(formMessages).removeClass('alert-danger ,alert-success');
            $(formMessages).text(' ');
          }, 50000);
        })
        .fail(function (data) {
          // Make sure that the formMessages div has the 'error' class.
          $(formMessages).removeClass('alert-success,');
          $(formMessages).addClass('alert-danger');

          // Set the message text.
          if (data.responseText !== '') {
            $(formMessages).text(data.responseText);
          } else {
            $(formMessages).text(
              'Oops! An error occured and your message could not be sent.'
            );
          }

          //Show the Message
          $(formMessages).slideDown('slow');
          $('html, body').animate({
              scrollTop: $('.form-messages').offset().top - 200
            },
            1000
          );
          setTimeout(function () {
            $(formMessages).slideUp();
            $(formMessages).removeClass('alert-danger ,alert-success');
            $(formMessages).text(' ');
          }, 50000);
        });
    });
  })();

  // Scrolling Functions
  (function () {
    // Scroll to the top of the page By Top Btn
    $('#top-btn').on('click', function () {
      $('html,body')
        .stop(true, false)
        .animate({
            scrollTop: 0
          },
          2000
        );
    });

    //  Scroll to Anchors
    $('a[href*="#"]:not([data-toggle="tab"]):not([href="#"]):not([href="#!"]):not([class*="control"]):not([class*="modal"]):not([data-toggle="collapse"]):not([href*="modal"]').on('click', function () {
      target = $(this.hash);
      $('html, body').animate({
          scrollTop: $(target).offset().top-50
        },
        1000
      );
    });
    $('header a:not(.dropdown-toggle) ').on('click', function () {
      $('header a:not(.dropdown-item)').removeClass('active');
      $(this).addClass('active');
      $('.navbar-collapse').collapse('hide');
    });
  })();

  // Lazy Load
  var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
  });

  currentScrollValue = $(window).scrollTop();
  if (currentScrollValue > 1) {
    $('header #navbar').addClass('scrolling');
  } else {
    $('header #navbar').removeClass('scrolling');
  }

  $(window).scroll(function () {
    // Navbar Actions
    (function () {
      currentScrollValue = $(window).scrollTop();
      // Navbar's Scrolling Style
      if (currentScrollValue > 1) {
        $('header #navbar').addClass('scrolling');
      } else {
        $('header #navbar').removeClass('scrolling');
      }
      // Show / Hide Navbar
      // if ($('main').hasClass('home')) {
      //   if (
      //     currentScrollValue > previousScrollValue &&
      //     currentScrollValue > 400
      //   ) {
      //     $(' #navbar').slideUp();
      //   } else {
      //     $(' #navbar').slideDown();
      //   }
      // } else {
      //   currentScrollValue = $(window).scrollTop();
      //
      //   if (currentScrollValue > previousScrollValue) {
      //     $(' #navbar').slideUp();
      //   } else {
      //     $(' #navbar').slideDown();
      //   }
      // }
      previousScrollValue = currentScrollValue;
    })();
  });

  setTimeout(()=>{
    $(".cc-acjo").remove();
  },2000);

  $(".open-chat-box").on('click', function(){
   setTimeout(function(){
     $crisp.push(['do', 'chat:open']);
   },100);
  });
});