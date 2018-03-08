var scrollLevel = 0;
var windowWidth = $(window).width();
var windowHeight = $(window).height();

console.log(windowHeight);

/*

=======================

  🎨 HEARDER SIZING 🎨

=======================

*/

function headerSizing(){
  $('.hero').css('height', windowHeight);
  if(windowWidth < 480){
    $('.hero__logo').attr('src', 'img/logo_mobile.png');
  } else {
    $('.hero__logo').attr('src', 'img/logo_big.png');
  }
}

headerSizing();

/*

===============

  🎨 SWIPER 🎨

===============

*/

var swiper = new Swiper('.swiper1', {
      slidesPerView: 1,
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

/*

=========================

  🎨 INCLUDE INSTAGRAM 🎨

=========================

*/

var instagram = {
  token: "1975026352.c6e2de8.3ef7709ab1e847beb0b6805c7c985fad",
  count: '&count=20',
  template: Handlebars.compile($("#insta-template").html()),
  clientX: undefined,
  overlayOn: false,
  request: function(){
    $.getJSON('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + this.token + this.count)
        .done( function(data) {
          var insta = this.template(data);
          $('.swiperInstagram .swiper-wrapper').append(insta);
          var swiperInsta = new Swiper('.swiperInstagram', {
                slidesPerView: 5,
                slidesPerGroup: 4,
                spaceBetween: 40,
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
              console.log(swiperInsta);
        }.bind(this))
        .fail (function() {
          $('.block__instagram').css('display', 'none');
    });
  }
};

instagram.request();

/*

=========================

  🎨 NAVIGATION HEADER 🎨

=========================

*/

var nav = {
    nav: $('.menu__pages'),
    logoLink: $('.menu__link--logo'),
    logoSrc: 'img/logo_small.png',
    burger: $('.burger'),
    cart: $('.menu__cart'),
    burgerBarTop: $('.burger__bar--top'),
    burgerBarBot: $('.burger__bar--bot'),
    opened: false,
    init: function(varScroll){
      this.logoLink.empty();
      if(varScroll < windowHeight - 39){
        this.logoLink.append('Home');
        this.cart.addClass('white');
        this.cart.find('svg').addClass('white');
      } else {
        if(windowWidth > 640){
          this.logoLink.append('<img class="menu__logo" src="' + this.logoSrc + '" alt="Home">');
        }
        this.cart.removeClass('white');
        this.cart.find('svg').removeClass('white');
      }
    },
    opening: function(){
      this.burger.click(function(){
        if(!this.opened){
          this.nav.addClass('open');
          this.burger.addClass('open');
          this.burgerBarTop.css('animation', '.6s burgerBarTopIn forwards');
          this.burgerBarBot.css('animation', '.6s burgerBarBotIn forwards');
          this.opened = true;
        } else {
          this.nav.removeClass('open');
          this.burger.removeClass('open');
          this.burgerBarTop.css('animation', '.3s burgerBarTopOut forwards');
          this.burgerBarBot.css('animation', '.3s burgerBarBotOut forwards');
          this.opened = false;
        }
      }.bind(this));
    }
};

nav.opening();
nav.init(scrollLevel);

/*

=========================

  🎨 FUNCTION SCROLL 🎨

=========================

*/

$(document).scroll(
  function(){
    scrollLevel = $(document).scrollTop();
    console.log(scrollLevel);
    nav.init(scrollLevel);
  }
);

/*

=========================

  🎨 FUNCTION RESIZE 🎨

=========================

*/

$(window).resize(
  function(){
    windowWidth = $(window).width();
    windowHeight = $(window).height();
    nav.init(scrollLevel);
    headerSizing();
  }
);
