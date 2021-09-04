/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener("click", () => {
            nav.classList.toggle("show");
        });
    }
};
showMenu("nav-toggle", "nav-menu");

/*===== ACTIVE AND REMOVE MENU =====*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
    navLink.forEach((n) => n.classList.remove("active"));
    this.classList.add("active");

    const navMenu = document.getElementById("nav-menu");
    navMenu.classList.remove("show");
}

navLink.forEach((n) => n.addEventListener("click", linkAction));

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: "top",
    distance: "80px",
    duration: 2000,
    reset: true,
});

/*SCROLL HOME*/
sr.reveal(".home__title", {});
sr.reveal(".button", { delay: 200 });
sr.reveal(".home__img", { delay: 400 });
sr.reveal(".home__social-icon", { interval: 200 });

/*SCROLL ABOUT*/
sr.reveal(".about__img", {});
sr.reveal(".about__subtitle", { delay: 400 });
sr.reveal(".about__text", { delay: 400 });

/*SCROLL SKILLS*/
sr.reveal(".skills__subtitle", {});
sr.reveal(".skills__text", {});
sr.reveal(".skills__data", { interval: 200 });
sr.reveal(".skills__img", { delay: 600 });

/*SCROLL WORK*/
sr.reveal(".work__img", { interval: 200 });

/*SCROLL CONTACT*/
sr.reveal(".contact__input", { interval: 200 });

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.add("active");
        } else {
            document
                .querySelector(".nav__menu a[href*=" + sectionId + "]")
                .classList.remove("active");
        }
    });
}
window.addEventListener("scroll", scrollActive);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const body = document.querySelector("body");
const header = document.querySelector(".l-header");
const icon = document.getElementById("theme");

themeButton.addEventListener("click", () => {
    body.classList.toggle("dark");
    header.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        icon.classList.add("bx-sun");
        icon.classList.remove("bx-moon");
    } else {
        icon.classList.add("bx-moon");
        icon.classList.remove("bx-sun");
    }
});
