let navbar = document.querySelector(".navbar");
let searchBox = document.querySelector(".search-box .bx-search");

searchBox.addEventListener("click", () => {
    navbar.classList.toggle("showInput");

    if (navbar.classList.contains("showInput")) {
        searchBox.classList.replace("bx-search", "bx-x");
    } else {
        searchBox.classList.replace("bx-x", "bx-search");
    }
});

// sidebar
let menuOpenMenu = document.querySelector(".navbar .bx-menu");
let menuCloseMenu = document.querySelector(".nav-links .bx-x");
let navLinks = document.querySelector(".nav-links");

menuOpenMenu.addEventListener("click", () => {
    navLinks.style.left = "0";
});
menuCloseMenu.addEventListener("click", () => {
    navLinks.style.left = "-100%";
});

// sidebar sub-menu open close
let htmlcssArrow = document.querySelector(".htmlcss-arrow");
let moreArrow = document.querySelector(".more-arrow");
let jsArrow = document.querySelector(".js-arrow");

htmlcssArrow.addEventListener("click", () => {
    navLinks.classList.toggle("show1");
});
moreArrow.addEventListener("click", () => {
    navLinks.classList.toggle("show2");
});
jsArrow.addEventListener("click", () => {
    navLinks.classList.toggle("show3");
});
