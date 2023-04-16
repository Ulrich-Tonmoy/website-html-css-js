class Particle {
  constructor(location) {
    this.x = location.x;
    this.y = location.y;
    const angle = Math.random() * Math.PI * 2;
    const speed = lerp(4, 10, Math.random());
    this.velocity = {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed,
    };
    this.life = 1;
    this.hue = lerp(25, 50, Math.random());
    this.#move();
    this.#move();
  }

  #move() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.life -= 0.05;
  }

  update(ctx) {
    const oldLocation = { x: this.x, y: this.y };
    this.#move();
    ctx.beginPath();
    ctx.strokeStyle = `hsla(${this.hue},100%,50%,${this.life})`;
    ctx.lineWidth = 3;
    ctx.moveTo(oldLocation.x, oldLocation.y);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
  }
}
