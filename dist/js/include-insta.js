var windowWidth = $(window).width();
var instaCount;
var $squares = [];
var isMobile = is_mobile();

function is_mobile() {
  if (/Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent)) {
    return true;
  } else {
    return false;
  }
}

function instaDisplay(){
    if(windowWidth < 700){
        instaCount = 3;
    } else if(windowWidth < 1000) {
        instaCount = 4;
    } else {
        instaCount = 5;
    }
}

instaDisplay();

/*function squareSizing(){
    $squares.forEach(function(square){
        var squareHeight = square.width();
        square.css({
          'height': squareHeight
        });
        square.closest('.block__container').css({
            'height': squareHeight
        });
    });
}*/

/*

=========================

  🎨 INCLUDE INSTAGRAM 🎨

=========================

*/

var instagram = {
  token: "3187623924.1677ed0.3bd611908d95486f8acd4b51e806f853",
  count: '&count=20',
  template: Handlebars.compile($("#insta-template").html()),
  clientX: undefined,
  overlayOn: false,
  request: function(){
    $.getJSON('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + this.token + this.count)
        .done( function(data) {
          var insta = this.template(data);
          $('.swiperInstagram .swiper-wrapper').empty();
          $('.swiperInstagram .swiper-wrapper').append(insta);
          var swiperInsta = new Swiper('.swiperInstagram', {
                slidesPerView: instaCount,
                slidesPerGroup: instaCount,
                spaceBetween: 24,
                loop: true,
                pagination: {
                  el: '.swiper-pagination',
                  clickable: true,
                },
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                },
              });
              $squares.push($('.slide__link--instagram'), $('.slide__img--instagram'), $('.block--instagram .overlay--art'));
              //squareSizing();
        }.bind(this))
        .fail (function() {
          $('.block__instagram').css('display', 'none');
    });
  }
};

instagram.request();

/* =========================

  🎨 FUNCTION RESIZE 🎨

=========================

*/

$(window).resize(
  function(){
    windowWidth = $(window).width();
    //squareSizing();
    instaDisplay();
    instagram.request();
  }
);
