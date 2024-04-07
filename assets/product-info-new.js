var swiper = new Swiper(".mySwiper", {
    direction: "horizontal",
    spaceBetween: 21,
    slidesPerView: 3,
navigation: {
nextEl: '.button-next',
prevEl: '.button-prev',
    },
watchSlidesProgress: true,
breakpoints: {
// when window width is >= 430px
616: {
spaceBetween: 21,
slidesPerView: 3,
slideToClickedSlide: 3,
direction: 'vertical',
},
}
  });

  var swiper = new Swiper(".mySwiper2", {
    loop: true,
    slidesPerView: 1,
    thumbs: {
      swiper: swiper,
    },
  });