/* eslint-disable no-undef */
const loginCard = popmotion.styler(document.querySelector('.card'));
// login card animate
popmotion.tween({
  from: {
    scale: 0.7,
    opacity: 0
  },
  to: {
    scale: 1,
    opacity: 1
  },
  duration: 1000
}).start(loginCard.set);

const signupCard = popmotion.styler(document.querySelector('.signupCard'));
// signup card animate
popmotion.tween({
  from: {
    scale: 0.7,
    opacity: 0
  },
  to: {
    scale: 1,
    opacity: 1
  },
  duration: 1000
}).start(signupCard.set);

// const dashboard = popmotion.styler(document.querySelector('#main-constainer'));
// const dashContainer = document.querySelector('main-container');
// // signup card animate
// popmotion.tween({
//   from: {
//     scale: 0.7,
//     opacity: 0
//   },
//   to: {
//     scale: 1,
//     opacity: 1
//   },
//   duration: 1000
// }).start(dashboard.set);
