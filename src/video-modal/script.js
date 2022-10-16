let btn = document.querySelector(".btn");
let clip = document.querySelector(".clip");
let video = document.querySelector("video");
let close = document.querySelector(".close");
btn.onclick = function () {
    btn.classList.add("active");
    clip.classList.add("active");
    video.currentTime = 0;
    video.play();
};
close.onclick = function () {
    btn.classList.remove("active");
    clip.classList.remove("active");
    video.pause();
};
