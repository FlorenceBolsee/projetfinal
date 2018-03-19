var scrollLevel = 0;
var windowWidth = $(window).width();
var windowHeight = $(window).height();
var footerHeight = $('.info').height();
var isMobile = is_mobile();
var $body = $(document.body);
var headerHeight = $('.hero').height();
var blockList = [];
var slidesCount;
var midnightTarget = $('.burger, .menu__cart');

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
    if($body.hasClass('homepage')){
      $('.hero').css('height', windowHeight);
      headerHeight = windowHeight - 72;
  }
  if(windowWidth < 480 || isMobile){
    $('.hero__bg').css('display', 'none');
    $('.hero__logo').attr('src', 'img/logo_mobile.png');
  } else {
    $('.hero__bg').css('display', 'block');
    $('.hero__logo').attr('src', 'img/logo_big.png');
  }
}

headerSizing();

var left;

function revealList(){
  blockList = [];
  $(".reveal").each(
    function(){
      if($(this).hasClass('reveal--left')){
        left = true;
      } else {
        left = false;
      }
      blockList.push({
        block: $(this),
        blockOffset: $(this).offset().top,
        left: left
      });
    }
  );
}

/*

===============

  🎨 SWIPER 🎨

===============

*/

function swiperSingle() {
    if(windowWidth < 700){
        slidesCount = 1;
    } else if(windowWidth < 1000) {
        slidesCount = 2;
    } else {
        slidesCount = 3;
    }
    if($('.swiperSingle')){
        var swiper = new Swiper('.swiperSingle', {
            slidesPerView: slidesCount,
            loop: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: true,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            }
        });
    }
}

$(document).ready(function(){
  revealList();
    if($('.swiper1')){
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
    }
    swiperSingle();
    if(windowWidth < 700){
        midnightTarget.midnight();
    }
});


/*

=========================

  🎨 NAVIGATION HEADER 🎨

=========================

*/


var nav = {
    nav: $('.menu__pages'),
    hero: $('.hero'),
    logoLink: $('.menu__link--logo'),
    logoSrc: 'img/logo-mini.svg',
    burger: $('.burger'),
    cart: $('.menu__cart'),
    burgerBarTop: $('.burger__bar--top'),
    burgerBarBot: $('.burger__bar--bot'),
    opened: false,
    fixed: false,
    init: function(varScroll){
      if((windowWidth >= 700 && !isMobile) && varScroll >= headerHeight){
        if(this.fixed == false){
            this.hero.addClass('fixed');
            this.fixed = true;
        }
      } else {
          if(this.fixed == true){
            this.hero.removeClass('fixed');
            this.fixed = false;
          }
      }
      if((windowWidth >= 1080 && !isMobile) && varScroll >= headerHeight){
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
          this.opened = true;
          $('.burger__bar--top').stop().animate({'top': '14px'}, 300, function(){
            $('.burger__bar--top').addClass('in');
          });
          $('.burger__bar--bot').stop().animate({'top': '14px'}, 300, function(){
            $('.burger__bar--bot').addClass('in');
          });
        } else {
          this.hero.removeClass('open');
          this.opened = false;
          $('.burger__bar--top').removeClass('in');
          $('.burger__bar--top').stop().animate({'top': '7px'}, 200);
          $('.burger__bar--bot').removeClass('in');
          $('.burger__bar--bot').stop().animate({'top': '21px'}, 200);
        }
      }.bind(this));
    }
};

nav.opening();
nav.init(scrollLevel);

$('.block__more').click(function(){
  $(this).empty();
  if(!$(this).hasClass('open')){
    $(this).append('Read less');
    $(this).addClass('open');
  } else {
    $(this).append('Read more');
    $(this).removeClass('open');
  }
  $(this).closest('.wrapper--exhibitions').find('.block__text--hidden').slideToggle();
});

/*

=========================

  🎨 FUNCTION SCROLL 🎨

=========================

*/

$(window).scroll(_.throttle(
  function(){
    scrollLevel = $(this).scrollTop();
    nav.init(scrollLevel);
}, 50));

var reveal = function () {
  scrollLevel = $(this).scrollTop();
  blockList.forEach(function(item) {
    if(scrollLevel > item.blockOffset - windowHeight){
      item.block.removeClass("reveal");
      if(item.left){
        item.block.removeClass("reveal--left");
      } else {
        item.block.removeClass("reveal--right");
      }
    }
    if(scrollLevel == 0){
      item.block.addClass("reveal");
      if(item.left){
        item.block.addClass("reveal--left");
      } else {
        item.block.addClass("reveal--right");
      }
    }
  });
};

window.addEventListener('scroll', _.throttle(reveal, 300));

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
    headerHeight = $('.hero').height();
    midnightTarget = $('.burger, .menu__cart');
    nav.init(scrollLevel);
    headerSizing();
    swiperSingle();
    revealList();
    if(windowWidth < 700){
        midnightTarget.midnight();
    }
  }
);

/*

=================

  🎨 FIX IE 🎨

================

*/

if(navigator.userAgent.match(/Trident\/7\./) || window.navigator.userAgent.indexOf("Edge") > -1) { // if IE
        $('body').on("mousewheel", function () {
            // remove default behavior
            event.preventDefault();

            //scroll without smoothing
            var wheelDelta = event.wheelDelta;
            var currentScrollPosition = window.pageYOffset;
            window.scrollTo(0, currentScrollPosition - wheelDelta);
        });
}
