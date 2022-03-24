const toggle = document.querySelector(".toggle");
const menu = document.querySelector(".menu");

toggle.onclick = function () {
    menu.classList.toggle("active");
};
