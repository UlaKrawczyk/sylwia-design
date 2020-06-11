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

//NAVIGATION:
const body = document.body;
const banner = document.querySelector("main");
const nav = document.querySelector(".nav");
const navHamburger = document.querySelector(".nav__hamburger");
const navMenu = document.querySelector(".nav__menu");
let navLinks = document.querySelectorAll(".navigation__link");
const scrollUp = "scroll-up";
const scrollDown = "scroll-down";
let bannerWidth;
let lastScroll = 0;

//navigation width
function setNavWidth() {
  bannerWidth = banner.offsetWidth;
  nav.style.width = bannerWidth + "px";
}
window.onload = function () {
  setNavWidth();
};
window.onresize = function () {
  setNavWidth();
}

//navigation revealing or hiding depanding on scroll direction
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll == 0) {
    body.classList.remove(scrollUp);
    return;
  }
  if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
    //down
    body.classList.remove(scrollUp);
    body.classList.add(scrollDown);
  } else if (currentScroll < lastScroll && body.classList.contains(scrollDown)) {
    //up
    body.classList.remove(scrollDown);
    body.classList.add(scrollUp);
  }
  lastScroll = currentScroll;
});

function changeHamburger() {
  const scrolledDown = window.pageYOffset;

  if (scrolledDown > 5) {
    navHamburger.classList.add("btn-menu_scrolled");
  } else {
    navHamburger.classList.remove("btn-menu_scrolled");
  }
}
window.addEventListener("scroll", changeHamburger);

//navigation - hamburger menu changes on cross and menu appears
navHamburger.addEventListener('click', function () {
  const isOpened = navHamburger.getAttribute('aria-expanded') === 'true';

  navHamburger.classList.toggle('btn-menu_open', !isOpened);

  navHamburger.setAttribute('aria-expanded', String(!isOpened));
  navMenu.classList.toggle('nav__menu_open', !isOpened);
});

//menu closes after clicking one of the links
for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener('click', function () {
    navMenu.classList.toggle('nav__menu_open');
    navHamburger.classList.toggle('btn-menu_open');
    navHamburger.setAttribute('aria-expanded', 'false');
  });
}