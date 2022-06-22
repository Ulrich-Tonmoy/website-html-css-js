const menuToggle = document.querySelector(".toggle");
const menu = document.querySelector(".menu");
const lists = document.querySelectorAll("li");

menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
    menuToggle.classList.toggle("active");
});

function activeLink() {
    lists.forEach((list) => {
        list.classList.remove("active");
        this.classList.add("active");
    });
}

lists.forEach((list) => list.addEventListener("click", activeLink));
