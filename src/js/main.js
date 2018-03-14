var scrollLevel = 0;
var windowWidth = $(window).width();
var windowHeight = $(window).height();
var footerHeight = $('.info').height();
var isMobile = is_mobile();
var $squares = [$('.block--last-product .slide__img'), $('.block--last-painting .slide__img'), $('.block--last-product .slide__link'), $('.block--last-painting .slide__link'), $('.grid__img')];
var $body = $(document.body);
var headerHeight = $('.hero').height();
var blockList = [];

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

function squareSizing(){
    $squares.forEach(function(square){
        var squareHeight = square.width();
        square.css({
          'height': squareHeight
        });
        square.closest('.block__container').css({
            'height': squareHeight
        });
    });
}

squareSizing();

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

$(document).ready(function(){
  revealList();
});

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
    fixed: false,
    init: function(varScroll){
      if(windowWidth < 700 && (varScroll < headerHeight)){
        this.cart.addClass('white');
        this.cart.find('svg').addClass('white');
      } else {
        this.cart.removeClass('white');
        this.cart.find('svg').removeClass('white');
      }
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
    console.log(scrollLevel);
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

console.log($('.block--instagram').offset().top - windowHeight);

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
    nav.init(scrollLevel);
    headerSizing();
    squareSizing();
    revealList();
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

/*

=================

  🎨 ISOTOPE 🎨

================

*/

var $grid = $('.grid');

$grid.isotope({
  // options
  itemSelector: '.grid-item',
  layoutMode: 'fitRows'
});

$('.filter-button-group').on( 'click', 'button', function() {
  var filterValue = $(this).attr('data-filter');
  $grid.isotope({ filter: filterValue });
});
