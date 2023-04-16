class Particle {
  constructor(effect, x, y, color) {
    this.effect = effect;
    this.x = Math.random() * this.effect.canvasWidth;
    this.y = this.effect.canvasHeight;
    this.color = color;
    this.originX = x;
    this.originY = y;
    this.size = this.effect.gap;
    this.dX = 0;
    this.dY = 0;
    this.vX = 0;
    this.vY = 0;
    this.force = 0;
    this.angle = 0;
    this.distance = 0;
    this.friction = Math.random() * 0.6 + 0.15;
    this.ease = Math.random() * 0.1 + 0.005;
  }

  draw() {
    this.effect.context.fillStyle = this.color;
    this.effect.context.fillRect(this.x, this.y, this.size, this.size);
  }

  update() {
    this.dx = this.effect.mouse.x - this.x;
    this.dy = this.effect.mouse.y - this.y;
    this.distance = this.dx * this.dx + this.dy * this.dy;
    this.force = -this.effect.mouse.radius / this.distance;

    if (this.distance < this.effect.mouse.radius) {
      this.angle = Math.atan2(this.dy, this.dx);
      this.vX += this.force * Math.cos(this.angle);
      this.vY += this.force * Math.sin(this.angle);
    }

    this.x += (this.vX *= this.friction) + (this.originX - this.x) * this.ease;
    this.y += (this.vY *= this.friction) + (this.originY - this.y) * this.ease;
  }
}
