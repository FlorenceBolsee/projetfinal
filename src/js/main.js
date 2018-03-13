var scrollLevel = 0;
var windowWidth = $(window).width();
var windowHeight = $(window).height();
var footerHeight = $('.info').height();
var isMobile = is_mobile();
var $squares = $('.block--last-product .slide__img, .block--last-painting .slide__img, .block--last-product .slide__link, .block--last-painting .slide__link');

console.log(windowWidth);

function is_mobile() {
  if (/Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent)) {
    return true;
  } else {
    return false;
  }
}

/*

==================

  🎨 FUNCTIONS 🎨

==================

*/

function headerSizing(){
  $('.hero').css('height', windowHeight);
  if(windowWidth < 480 || isMobile){
    $('.hero__bg').css('display', 'none');
    $('.hero__logo').attr('src', 'img/logo_mobile.png');
  } else {
    $('.hero__bg').css('display', 'block');
    $('.hero__logo').attr('src', 'img/logo_big.png');
  }
}

headerSizing();

function squareSizing(){
    var squareHeight = $squares.width();
    $squares.css({
      'height': squareHeight
    });
}

squareSizing();

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
  token: "3187623924.1677ed0.3bd611908d95486f8acd4b51e806f853",
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
                slidesPerView: 3,
                slidesPerGroup: 3,
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
    hero: $('.hero'),
    logoLink: $('.menu__link--logo'),
    logoSrc: 'img/logo_small.png',
    burger: $('.burger'),
    cart: $('.menu__cart'),
    burgerBarTop: $('.burger__bar--top'),
    burgerBarBot: $('.burger__bar--bot'),
    opened: false,
    init: function(varScroll){
      if(windowWidth < 700 && (varScroll < windowHeight - 39)){
        this.cart.addClass('white');
        this.cart.find('svg').addClass('white');
      } else {
        this.cart.removeClass('white');
        this.cart.find('svg').removeClass('white');
      }
      if((windowWidth >= 700 && !isMobile) && varScroll >= windowHeight - 72){
        this.hero.addClass('fixed');
      } else {
        this.hero.removeClass('fixed');
      }
      if((windowWidth >= 1080 && !isMobile) && varScroll >= windowHeight - 72){
          this.logoLink.empty();
          this.logoLink.append('<img class="menu__logo" src="' + this.logoSrc + '" alt="Home">');
          this.logoLink.addClass('image');
      } else {
          this.logoLink.empty();
          this.logoLink.append('Home');
          this.logoLink.removeClass('image');
      }
    },
    opening: function(){
      this.burger.click(function(){
        if(!this.opened){
          this.hero.addClass('open');
          this.burger.css('animation', '.3s burgerBGgo forwards');
          this.burgerBarTop.css('animation', '.6s burgerBarTopIn forwards');
          this.burgerBarBot.css('animation', '.6s burgerBarBotIn forwards');
          this.opened = true;
        } else {
          this.hero.removeClass('open');
          this.burger.css('animation', '.3s burgerBGback forwards');
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

$(window).scroll(_.throttle(
  function(){
    scrollLevel = $(this).scrollTop();
    nav.init(scrollLevel);
  }, 300));

/*

=========================

  🎨 FUNCTION RESIZE 🎨

=========================

*/

$(window).resize(
  function(){
    windowWidth = $(window).width();
    windowHeight = $(window).height();
    footerHeight = $('.info').height();
    nav.init(scrollLevel);
    headerSizing();
    squareSizing();
  }
);
