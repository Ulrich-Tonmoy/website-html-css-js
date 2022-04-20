const hr = document.querySelector("#hr");
const min = document.querySelector("#min");
const sec = document.querySelector("#sec");

const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const ampm = document.getElementById("ampm");

setInterval(() => {
    let h = new Date().getHours();
    let m = new Date().getMinutes();
    let s = new Date().getSeconds();

    hr.style.transform = `rotateZ(${h * 30 + m / 12}deg)`;
    min.style.transform = `rotateZ(${m * 6}deg)`;
    sec.style.transform = `rotateZ(${s * 6}deg)`;

    let am = h > 12 ? "PM" : "AM";
    if (h > 12) h -= 12;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    hours.innerHTML = h;
    minutes.innerHTML = m;
    seconds.innerHTML = s;
    ampm.innerHTML = am;
}, 1000);
