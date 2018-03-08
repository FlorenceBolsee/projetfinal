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

var nav = {
    nav: $('.hero__menu'),
    logoSrc: 'img/logo_small.png'
};
