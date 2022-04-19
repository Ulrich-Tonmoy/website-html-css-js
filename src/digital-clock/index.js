setInterval(() => {
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");
    const ampm = document.getElementById("ampm");

    const hh = document.getElementById("h");
    const mm = document.getElementById("m");
    const ss = document.getElementById("s");

    const hr = document.querySelector(".hr_dot");
    const min = document.querySelector(".min_dot");
    const sec = document.querySelector(".sec_dot");

    let h = new Date().getHours();
    let m = new Date().getMinutes();
    let s = new Date().getSeconds();
    let am = h > 12 ? "PM" : "AM";

    if (h > 12) h -= 12;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    hours.innerHTML = h + "<br/><span>Hours</span>";
    minutes.innerHTML = m + "<br/><span>Minutes</span>";
    seconds.innerHTML = s + "<br/><span>Seconds</span>";
    ampm.innerHTML = am;

    hh.style.strokeDashoffset = 440 - (440 * h) / 12;
    mm.style.strokeDashoffset = 440 - (440 * m) / 60;
    ss.style.strokeDashoffset = 440 - (440 * s) / 60;

    hr.style.transform = `rotate(${h * 30}deg)`;
    min.style.transform = `rotate(${m * 6}deg)`;
    sec.style.transform = `rotate(${s * 6}deg)`;
}, 1000);
