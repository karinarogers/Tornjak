//swiper imports
import Swiper from 'swiper';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css/bundle';

// mobile menu
const ui = {
    menu: null,
    menuItems: null,
    navItems: null,
    hamburger: null,
    closeIcon: null,
    menuIcon: null,
};

function toggleMenu() {
    if (ui.menu.classList.contains("show-menu")) {
        ui.menu.classList.remove("show-menu");
        ui.closeIcon.style.display = "none";
        ui.menuIcon.style.display = "block";
    } else {
        ui.menu.classList.add("show-menu");
        ui.closeIcon.style.display = "block";
        ui.menuIcon.style.display = "none";
    }
}

function main() {
    ui.menu = document.querySelector(".nav-wrapper");
    ui.menuItems = document.querySelectorAll(".nav-item");
    ui.navItems = document.querySelectorAll(".nav-item");
    ui.hamburger = document.querySelector(".hamburger");
    ui.closeIcon = document.querySelector(".close-icon");
    ui.menuIcon = document.querySelector(".menu-icon");

    ui.hamburger.addEventListener("click", toggleMenu);

    ui.menuItems.forEach(
        function (menuItem) {
            menuItem.addEventListener("click", toggleMenu);
        }
    );
}

main();


// swiper cards on TCNA page

//https://codepen.io/kristen17/pen/BaGEeKe
var swiper = new Swiper(".swiper", {
    // modules: [Navigation],
    modules: [Navigation, EffectCoverflow],
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    coverflowEffect: {
        rotate: 0,
        stretch: 6,
        depth: 25,
        modifier: 4,
        slideShadows: true
    },
    loop: false,
    // Navigation arrows
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    keyboard: {
        enabled: true
    },
    mousewheel: {
        thresholdDelta: 70
    },
    initialSlide: 1,
    on: {
        click(event) {
            swiper.slideTo(this.clickedIndex);
        }
    },
    // on: {
    //   breakpoint: function (swiper, breakpoint) {
    //     console.log({breakpoint});
    //   }
    // },
    breakpoints: {
        560: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 3,
        },
        1024: {
            slidesPerView: 3,
        }
    }
});
