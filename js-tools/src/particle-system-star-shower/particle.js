class Particle {
  constructor(effect) {
    this.effect = effect;
    this.radius = Math.floor(Math.random() * 7 + 3);
    this.x = this.effect.heading.x + Math.random() * this.effect.heading.width;
    this.y = -Math.random() * this.effect.height * 0.5;
    this.vx = Math.random() * 2 - 1;
    this.vy = 0;
    this.gravity = this.radius * 0.001;
    this.friction = 0.95;
    this.width = this.radius * 2;
    this.height = this.radius * 2;
    this.bounced = 0;
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();

    if (this.effect.debug) {
      context.strokeRect(
        this.x - this.radius,
        this.y - this.radius,
        this.radius * 2,
        this.radius * 2
      );
    }
  }
  update() {
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;

    if (
      this.y > this.effect.height + this.radius + this.effect.maxDistance ||
      this.x < -this.radius - this.effect.maxDistance ||
      this.x > this.effect.width + this.radius + this.effect.maxDistance
    ) {
      this.reset();
    }
    if (
      this.x - this.radius < this.effect.heading.x + this.effect.heading.width &&
      this.x - this.radius + this.width > this.effect.heading.x &&
      this.y - this.radius < this.effect.heading.y + 5 &&
      this.height + this.y - this.radius > this.effect.heading.y &&
      this.bounced < 8
    ) {
      this.vy *= -0.7;
      this.vx *= 2;
      this.y = this.effect.heading.y - this.radius;
      this.bounced++;
    }
  }
  reset() {
    this.x = this.effect.heading.x + Math.random() * this.effect.heading.width;
    this.y = -this.radius - this.effect.maxDistance - Math.random() * this.effect.height * 0.1;
    this.vy = 0;
    this.vx = Math.random() * 2 - 1;
    this.bounced = 0;
  }
}
