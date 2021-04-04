/* eslint-disable no-undef */
const loginCard = popmotion.styler(document.querySelector('.animate'));
// login card animate
popmotion.tween({
  from: {
    scale: 0.7,
    opacity: 0,
    y: 100
  },
  to: {
    scale: 1,
    opacity: 1,
    y: 0
  },
  duration: 1000
}).start(loginCard.set);

const formAnimate = popmotion.styler(document.querySelector('.animateForm'));
// signup card animate
popmotion.tween({
  from: {
    scale: 0,
    opacity: 0
  },
  to: {
    scale: 1,
    opacity: 1
  },
  duration: 1000
}).start(formAnimate.set);
