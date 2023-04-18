class Effect {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.particles = [];

    this.img = img1;
    this.img2 = img2;
    this.img3 = img3;
    this.img4 = img4;
    this.img5 = img5;

    this.angler = true;
    this.fox = false;
    this.plant = false;
    this.spider = false;
    this.turtle = false;

    this.centerX = this.width * 0.5;
    this.centerY = this.height * 0.5;
    this.x = this.centerX - this.img.width * 0.5;
    this.y = this.centerY - this.img.height * 0.5;
    this.gap = 3;
    this.mouse = {
      radius: 3000,
      x: undefined,
      y: undefined,
    };
    window.addEventListener("mousemove", (event) => {
      this.mouse.x = event.x;
      this.mouse.y = event.y;
    });
  }

  init(ctx) {
    ctx.clearRect(0, 0, this.width, this.height);
    if (this.angler === true) {
      ctx.drawImage(this.img, this.x, this.y - this.img.height / 2.2);
    }
    if (this.fox === true) {
      ctx.drawImage(this.img2, this.x - this.img2.width, this.y + this.img2.height / 1.2);
    }
    if (this.plant === true) {
      ctx.drawImage(this.img3, this.x - this.img3.width, this.y - this.img3.height / 3);
    }
    if (this.spider === true) {
      ctx.drawImage(this.img4, this.x + this.img4.width, this.y - this.img4.height / 3);
    }
    if (this.turtle === true) {
      ctx.drawImage(this.img5, this.x + this.img5.width / 20, this.y + this.img5.height / 1.7);
    }

    const pixels = ctx.getImageData(0, 0, this.width, this.height).data;
    for (let y = 0; y < this.height; y += this.gap) {
      for (let x = 0; x < this.width; x += this.gap) {
        const index = (y * this.width + x) * 4;
        const red = pixels[index];
        const green = pixels[index + 1];
        const blue = pixels[index + 2];
        const alpha = pixels[index + 3];
        const color = `rgb(${red}, ${green}, ${blue})`;

        if (alpha > 0) {
          this.particles.push(new Particle(this, x, y, color));
        }
      }
    }
  }

  draw(ctx) {
    this.particles.forEach((particle) => particle.draw(ctx));
  }

  update() {
    this.particles.forEach((particle) => particle.update());
  }

  warp() {
    this.particles.forEach((particle) => particle.warp());
  }

  toggle(name, ctx) {
    switch (name) {
      case "angler":
        this.angler = true;
        this.fox = false;
        this.plant = false;
        this.spider = false;
        this.turtle = false;
        break;
      case "fox":
        this.angler = false;
        this.fox = true;
        this.plant = false;
        this.spider = false;
        this.turtle = false;
        break;
      case "plant":
        this.angler = false;
        this.fox = false;
        this.plant = true;
        this.spider = false;
        this.turtle = false;
        break;
      case "spider":
        this.angler = false;
        this.fox = false;
        this.plant = false;
        this.spider = true;
        this.turtle = false;
        break;
      case "turtle":
        this.angler = false;
        this.fox = false;
        this.plant = false;
        this.spider = false;
        this.turtle = true;
        break;
      default:
        this.angler = true;
        this.fox = true;
        this.plant = true;
        this.spider = true;
        this.turtle = true;
        break;
    }
    this.particles = [];
    this.init(ctx);
  }
}
