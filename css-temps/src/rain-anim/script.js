function rain(amount) {
    const body = document.querySelector("body");
    let i = 0;
    while (i < amount) {
        const drop = document.createElement("i");

        const width = Math.random() * 5;
        const height = Math.random() * 200;
        const posX = Math.floor(Math.random() * window.innerWidth);
        const delay = Math.random() * -20;
        const duration = Math.random() * 5;
        drop.style.width = 0.2 + width + "px";
        drop.style.height = 0.2 + height + "px";
        drop.style.left = posX + "px";
        drop.style.animationDelay = delay + "s";
        drop.style.animationDuration = 1 + duration + "s";

        body.appendChild(drop);
        i++;
    }
}

rain(100);
