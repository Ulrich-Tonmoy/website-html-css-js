const topButton = document.querySelector(".back-to-top");
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (
        document.body.scrollTop > 500 ||
        document.documentElement.scrollTop > 500
    ) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
}
