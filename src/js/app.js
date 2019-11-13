import '../scss/main.scss';

// import {
//   TweenLite,
//   TimelineLite,
//   TimelineMax,
//   TweenMax,
//   Power2,
//   Linear,
// } from 'gsap';

// import './smooth-scroll';

// import ScrollMagic from 'scrollmagic';

// import 'animation.gsap';
// import 'debug.addIndicators';

import $ from 'jquery';

function getAspectRatio(h, w) {
  var mode = null;
  var dividend = 0;
  var divisor = 0;
  var remainder = 0;
  var aspectRatio = 0;

  if (h > w) {
    dividend = h;
    divisor = w;
    mode = 'portrait';
  }

  if (w > h) {
    dividend = w;
    divisor = h;
    mode = 'landscape';
  }

  var gcd = -1;
  while (gcd == -1) {
    remainder = dividend % divisor;
    if (remainder == 0) {
      gcd = divisor;
    } else {
      dividend = divisor;
      divisor = remainder;
    }
  }

  var hr = w / gcd;
  var vr = h / gcd;
  aspectRatio = hr / vr;
  return aspectRatio;
}

$('.page-menu').each(function() {
  $(this)
    .find('.page-menu-item')
    .each(function() {
      $(this).mouseover(function() {
        let $this = $(this);
        let thisType = $this.data('type');
        let activeCssClass = 'active';

        $('.page-menu-item').removeClass(activeCssClass);
        $(`[class*=backgrounds--]`).removeClass(
          activeCssClass
        );

        $this.addClass(activeCssClass);
        $(`.backgrounds--${thisType}`).addClass(
          activeCssClass
        );
      });
    });
});

const setImagePB = () => {
  $('.image').each((idx, fig) => {
    $(fig)
      .find('img')
      .each((idx, elem) => {
        let elemWidth = elem.naturalWidth,
          elemHeight = elem.naturalHeight;

        var ar = getAspectRatio(elemHeight, elemWidth);

        $(fig).attr(
          'style',
          `padding-bottom: calc(100% / ${ar})`
        );
      });
  });
};

$(window).on({
  load: function() {
    setImagePB();
  },
  resize: function() {
    setImagePB();
  },
});

// var controller = new ScrollMagic.Controller();

// var headers = document.querySelectorAll(
//   '.headings-wrapper > h1'
// );

// const tweens = {
//   lineFrom: TweenMax.from('.line', 0.75, {
//     scaleX: 0,
//     transformOrigin: 'right center',
//   }),
// };

// headers.forEach(el => {
//   TweenMax.from(el, 1, { opacity: 0, y: 100 });
//   TweenMax.to(el, 1.25, { opacity: 1, y: 0 });
// });

// var triggers = document.querySelectorAll('.clip-images');

// triggers.forEach(el => {
//   const showClipImage = TweenMax.to(
//     el,
//     1.25,
//     {
//       clipPath: 'inset(0px 0px 0px 0px)',
//       ease: Power4.easeOut,
//     },
//     'reveal'
//   );

//   new ScrollMagic.Scene({
//     triggerElement: el,
//     triggerHook: 1,
//   })
//     .setTween(showClipImage)
//     // .addIndicators()
//     .addTo(controller);
// });

// var parallaxBoxes = document.querySelectorAll(
//   '[parallax-box] '
// );

// parallaxBoxes.forEach(el => {
//   var timelineMax = new TimelineMax();
//   var twMax = null;

//   timelineMax.to(el, 1, {
//     yPercent: -20,
//     ease: Linear.easeNone,
//   });

//   new ScrollMagic.Scene({
//     triggerElement: el,
//     triggerHook: 0.6,
//     duration: '100%',
//   })
//     .setTween(timelineMax)
//     // .addIndicators()
//     .addTo(controller);

//   let headings = document.querySelectorAll(
//     '.absolute-box__content > [class*=headings-wrapper] > h1'
//   );

//   headings.forEach(el => {
//     TweenMax.staggerTo(el, 1.25, { opacity: 1, y: 0 });
//   });
// });
