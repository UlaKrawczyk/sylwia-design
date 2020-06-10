import '../scss/main.scss';
import moment from 'moment';

//moment.js testing
const startOfDay = moment().startOf('day').fromNow();
console.log(startOfDay);

//section features fades in and section tips slides in
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

//section reviews slider + dots changing color
//we need as many dots as reviews!
const sliderImages = document.querySelectorAll('.reviews__slide');
const dots = document.querySelectorAll('.reviews__span');
const arrowLeft = document.querySelector("#arrow-left");
const arrowRight = document.querySelector("#arrow-right");
let current = 0;

function reset() {
  for(let i = 0; i<sliderImages.length; i++) {
    sliderImages[i].style.display = 'none';
    dots[i].style.color = '#160441';
  }
}

function startSlide() {
  reset();
  sliderImages[0].style.display = 'block';
  dots[0].style.color = "#536c59";
}

function slideLeft() {
  reset();
  sliderImages[current - 1].style.display = 'block';
  dots[current - 1].style.color = '#536c59';
  current--;
}
function slideRight() {
  reset();
  sliderImages[current + 1].style.display = 'block';
  dots[current + 1].style.color = '#536c59';
  current++;
}

arrowLeft.addEventListener('click', function() {
  if(current === 0) {
    current = sliderImages.length;
  }
  slideLeft();
});
arrowRight.addEventListener('click', function() {
  if(current === sliderImages.length - 1) {
    current = -1;
  }
  slideRight();
});

startSlide();
