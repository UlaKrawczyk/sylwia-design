import '../scss/main.scss';
import moment from 'moment';
//moment.js testing
const startOfDay = moment().startOf('day').fromNow();
console.log(startOfDay);


const testFileJs = document.querySelector('.header__heading');
if(testFileJs) {
  console.log('plik index.js może działać');

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

//DARK MODE:
//dark-mode switch
const buttonDark = document.querySelector('.dark-mode');
const main = document.querySelector('main');
const logo = document.querySelector('.logo');
const logoText = document.querySelector('.logo__text');
const header = document.querySelector('header');
const footer = document.querySelector('footer');
const features = document.querySelector('.features');
const reviewsBase = document.querySelector('.reviews-base');
const tips = document.querySelector('.tips');
const tipsDecor = document.querySelector('.tips__decor');
const tipsButton = document.querySelectorAll('.button-readMore');
const sets = document.querySelector('.sets');
const setsHeading = document.querySelectorAll('.heading-tertiary');
let isDark = false;

buttonDark.addEventListener('click', () => {
  if(isDark) { //style w trybie jasnym
    document.body.style.backgroundColor = '#fff';
    main.style.setProperty('background-color', '#e5e7e3');
    navMenu.style.setProperty('background-color', '#e5e7e3');
    header.style.setProperty('background-color', '#536c59');
    footer.style.setProperty('background-color', '#536c59');
    buttonDark.style.setProperty('background-color', '#536c59');
    features.style.setProperty('background-color', '#eff1ee');
    reviewsBase.style.setProperty('background-color', '#eff1ee');
    tips.style.setProperty('color', '#160441');
    tipsDecor.style.setProperty('color', 'rgba(188, 204, 193, 0.274)');
    tipsButton.forEach(button => {
      button.style.setProperty('color', '#536c59');
      button.style.setProperty('border-color', '#536c59');
    });
    sets.style.setProperty('color', '#160441');
    logo.style.setProperty('border-color', '#160441');
    logoText.style.setProperty('color', '#160441');
    setsHeading.forEach(heading => {
      heading.style.setProperty('color', '#536c59');
    });  
    buttonDark.innerHTML = `dark mode`;
    isDark = false;
    
  } else { //style w trybie ciemnym
    document.body.style.backgroundColor = '#536c59';
    main.style.setProperty('background-color', '#536c59');
    navMenu.style.setProperty('background-color', '#9ab4a0');
    header.style.setProperty('background-color', '#66886e');
    footer.style.setProperty('background-color', '#66886e');
    buttonDark.style.setProperty('background-color', '#66886e');
    features.style.setProperty('background-color', '#9ab4a0');
    reviewsBase.style.setProperty('background-color', '#9ab4a0');
    tips.style.setProperty('color', '#eff1ee');
    tipsDecor.style.setProperty('color', 'rgba(188, 204, 193, 0.164)');
    tipsButton.forEach(button => {
      button.style.setProperty('color', '#eff1ee');
      button.style.setProperty('border-color', '#eff1ee');
    });
    sets.style.setProperty('color', '#eff1ee');
    logoText.style.setProperty('color', '#eff1ee');
    logo.style.setProperty('border-color', '#eff1ee');
    setsHeading.forEach(heading => {
      heading.style.setProperty('color', '#eff1ee');
    });  
    
    buttonDark.innerHTML = `light mode`;
    isDark = true;
  }
});

}


