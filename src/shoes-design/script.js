const slides = document.querySelectorAll('.slide');
const carousel = document.getElementById('carousel');
const left = document.getElementById('left');
const right = document.getElementById('right');
const slides_count = slides.length;

let current_slide = 0;

left.addEventListener('click', () => {
    current_slide--;
    if(current_slide < 0) {
        current_slide = slides_count - 1;
    }

    UpdateCarousel();
});

right.addEventListener('click', () => {
    current_slide++;
    if(current_slide > slides_count - 1) {
        current_slide = 0;
    }

    UpdateCarousel();
});

function UpdateCarousel() {
    carousel.style.transform = `translateX(${-current_slide * slides[0].offsetWidth}px)`;
    document.body.style.background = `#${slides[current_slide].getAttribute("bg-color")}`;
}