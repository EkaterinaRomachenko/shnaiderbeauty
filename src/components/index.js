import '../styles/index.css';
import { anchors, buttonActive, popup, popupContent, cards, next, prev, menuBurgerBlock, btnBurger, linkBurgerMenu, sliderButton, hiddenElements } from './utils';
import { openPopup, closePopup } from './popup';
import './swiper.js'
// import { swiper } from './swiper.js';

import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'
import { Navigation, Pagination } from 'swiper/modules';

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const blockID = anchor.getAttribute('href')
    document.querySelector(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}


// training
buttonActive.forEach((btn) => {
  btn.addEventListener("click", modalShow);
})

let swiper;

function modalShow(event) {
  const cardId = parseInt(event.target.closest('.training-section__card').getAttribute('data-card-id'));

  initSwiper();
  swiper.slideTo(cardId, 0);

  openPopup(popup);
}

function initSwiper() {
  const cardsElements = document.querySelectorAll('.training-section__card')
  const popupCards = [];
  if (!swiper) {
    cardsElements.forEach(card => {
      const clonedCard = card.cloneNode(true);
      popupCards.push(clonedCard);
      popupContent.appendChild(clonedCard);
    });

    swiper = new Swiper('.popup__swiper', {
      modules: [Navigation, Pagination],
      cssMode: true,
      slidesPerView: 1,
      spaceBetween: 150,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    popupCards.forEach((clonedCard) => {
      const res = clonedCard.querySelectorAll('.hidden');
      res.forEach((list) => {
        list.classList.toggle('hidden');
      });
    });

    popupCards.forEach((clonedCard) => {
      const listCard = clonedCard.querySelectorAll('.training-section__card-list');
      listCard.forEach((list) => {
        list.classList.toggle('list');
      });
    });

    popupCards.forEach((clonedCard) => {
      const buttons = clonedCard.querySelectorAll('.training-section__card-button');
      buttons.forEach((button) => {
        button.textContent = 'Скрыть';
        button.addEventListener('click', function (e) {
          e.preventDefault();
          closePopup(popup);
        });
      });
    });
  }
}

//slider
function nextSlide() {
  cards.scrollLeft = cards.scrollLeft += window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}

function prevSlide() {
  cards.scrollLeft = cards.scrollLeft -= window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100;
}

next.addEventListener('click', nextSlide)
prev.addEventListener('click', prevSlide)


// переключать клавишами
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  if (e.key === 'ArrowRight') nextSlide();
})

//burger-menu
btnBurger.addEventListener('click', function (e) {
  e.preventDefault();
  btnBurger.classList.toggle('menu-burger__icon_active');
  menuBurgerBlock.classList.toggle('menu-burger__block_type_active');
})

linkBurgerMenu.forEach((link) => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    btnBurger.classList.remove('menu-burger__icon_active');
    menuBurgerBlock.classList.remove('menu-burger__block_type_active');
  })
})


function showText() {
  sliderButton.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.target.closest('.slider__container').querySelector('.more').classList.toggle('hidden') ? btn.textContent = 'Читать ещё' : btn.textContent = 'Cкрыть';
    })
  })
}
showText()


//анимация
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.isIntersecting ? entry.target.classList.add("show") : '';
  });
});
hiddenElements.forEach((el) => observer.observe(el));


// анимации

window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);


function reveal() {
  let reveals = document.querySelectorAll('.scroll');
  for (let i = 0; i < reveals.length; i++) {
    let windowHeight = window.innerHeight;
    let revealTop = reveals[i].getBoundingClientRect().top;
    let revealPoint = 100;
    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add('active');
    } else {
      reveals[i].classList.remove('active');
    }
  }
}
