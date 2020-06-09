import '../scss/main.scss';

/* place your code below */

const faders = document.querySelectorAll('.fade-in');
const sliders = document.querySelectorAll('.slide-in');


const appearOptions = {
  rootMargin: '0px 0px -100px 0px',
  threshold: 0
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if(!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('appear');
      appearOnScroll.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
sliders.forEach(slider => {
  appearOnScroll.observe(slider);
});