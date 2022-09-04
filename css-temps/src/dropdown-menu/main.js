function show(a) {
    document.querySelector(".text2").value = a;
}
let dropdown = document.querySelector(".dropdown");
dropdown.onclick = function () {
    dropdown.classList.toggle("active");
};