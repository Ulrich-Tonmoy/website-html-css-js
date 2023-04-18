class Particle {
  constructor(effect, x, y, color) {
    this.effect = effect;
    this.size = this.effect.gap;
    this.originX = Math.floor(x);
    this.originY = Math.floor(y);
    this.color = color;

    this.vX = 0;
    this.vY = 0;
    this.dX = 0;
    this.dY = 0;
    this.distance = 0;
    this.force = 0;
    this.angle = 0;
    this.friction = 0.85;
    // Change these 3 to make different kind of animation
    this.x = Math.random() * this.effect.width;
    this.y = Math.random() * this.effect.height;
    this.ease = 0.1;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  update() {
    this.dX = this.effect.mouse.x - this.x;
    this.dY = this.effect.mouse.y - this.y;
    this.distance = this.dX * this.dX + this.dY * this.dY;
    this.force = -this.effect.mouse.radius / this.distance;

    if (this.distance < this.effect.mouse.radius) {
      this.angle = Math.atan2(this.dY, this.dX);
      this.vX += this.force * Math.cos(this.angle);
      this.vY += this.force * Math.sin(this.angle);
    }

    this.x += (this.vX *= this.friction) + (this.originX - this.x) * this.ease;
    this.y += (this.vY *= this.friction) + (this.originY - this.y) * this.ease;
  }

  warp() {
    // Change these 3 to make different kind of animation
    this.x = Math.random() * this.effect.width;
    this.y = Math.random() * this.effect.width;
    this.ease = 0.05;
  }
}
