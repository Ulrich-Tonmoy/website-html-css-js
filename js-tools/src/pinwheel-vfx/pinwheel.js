class Pinwheel {
  constructor() {
    this.x = null;
    this.y = null;
    this.size = null;
    this.speed = 0;
    this.angle = 0;
  }

  update(ctx, center, size) {
    this.x = center.x;
    this.y = center.y;
    if (this.size) {
      const diff = size - this.size;
      const push = diff * 0.003;
      this.speed += push;
    }
    this.size = size;
    this.angle += this.speed;
    this.speed *= 0.99;

    this.#drawPart(ctx, "orange", this.angle);
    this.#drawPart(ctx, "pink", this.angle + Math.PI / 2);
    this.#drawPart(ctx, "skyblue", this.angle + Math.PI);
    this.#drawPart(ctx, "seagreen", this.angle - Math.PI / 2);
  }

  #drawPart(ctx, color, angle) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -this.size / 2);
    ctx.lineTo(this.size / 4, -this.size / 4);
    ctx.lineTo(this.size / 4, 0);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}
