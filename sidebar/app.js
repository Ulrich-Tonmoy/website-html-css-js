let arrow = document.querySelectorAll(".arrow");
let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");
let sidebarLogoBtn = document.querySelector(".bx-code-block");

for (var i = 0; i < arrow.length; i++) {
    arrow[i].addEventListener("click", (e) => {
        let arrowParent = e.target.parentElement.parentElement;
        arrowParent.classList.toggle("showMenu");
    });
}

sidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});
sidebarLogoBtn.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});
