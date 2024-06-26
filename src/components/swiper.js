import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'
import { Navigation, Pagination } from 'swiper/modules';

new Swiper(".slider", {
  modules: [Navigation, Pagination],
  cssMode: true,
  spaceBetween: 70,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});




