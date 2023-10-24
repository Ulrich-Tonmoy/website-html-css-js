import Particle from "./particle.js";

class Effect {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.debug = false;
    this.element = caption.getBoundingClientRect();
    this.canvasSize = this.canvas.getBoundingClientRect();
    this.heading = {
      x: this.element.x - this.canvasSize.x,
      y: this.element.y - this.canvasSize.y,
      width: this.element.width,
      height: this.element.height,
    };
    this.maxDistance = 90;
    this.particles = [];
    this.numberOfParticles = 300;
    this.createParticles();

    this.mouse = {
      x: 0,
      y: 0,
      pressed: false,
      radius: 200,
    };

    window.addEventListener("keydown", (e) => {
      if (e.key === "d") this.debug = !this.debug;
    });
    window.addEventListener("resize", (e) => {
      this.resize(e.target.window.innerWidth, e.target.window.innerHeight);
    });
    window.addEventListener("mousedown", (e) => {
      this.mouse.pressed = true;
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });
    window.addEventListener("mousemove", (e) => {
      if (this.mouse.pressed) {
        this.mouse.x = e.x;
        this.mouse.y = e.y;
      }
    });
    window.addEventListener("mouseup", (e) => {
      this.mouse.pressed = false;
    });
  }
  createParticles() {
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle(this));
    }
  }
  handleParticles(context) {
    context.fillStyle = gradient;
    this.connectParticles(context);
    this.particles.forEach((particle) => {
      particle.draw(context);
      particle.update();
    });
    if (this.debug) {
      context.strokeRect(this.heading.x, this.heading.y, this.heading.width, this.heading.height);
    }
  }
  connectParticles(context) {
    for (let a = 0; a < this.particles.length; a++) {
      for (let b = a; b < this.particles.length; b++) {
        const dx = this.particles[a].x - this.particles[b].x;
        const dy = this.particles[a].y - this.particles[b].y;
        const distance = Math.hypot(dx, dy);
        if (distance < this.maxDistance) {
          context.save();
          const opacity = 1 - distance / this.maxDistance;
          context.globalAlpha = opacity;
          context.beginPath();
          context.moveTo(this.particles[a].x, this.particles[a].y);
          context.lineTo(this.particles[b].x, this.particles[b].y);
          context.stroke();
          context.restore();
        }
      }
    }
  }
  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;
    this.element = caption.getBoundingClientRect();
    this.canvasSize = this.canvas.getBoundingClientRect();
    this.heading = {
      x: this.element.x - this.canvasSize.x,
      y: this.element.y - this.canvasSize.y,
      width: this.element.width,
      height: this.element.height,
    };
    gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "white");
    gradient.addColorStop(0.5, "magenta");
    gradient.addColorStop(1, "pink");
    this.context.fillStyle = gradient;
    this.context.strokeStyle = "white";
    this.particles.forEach((particle) => {
      particle.reset();
    });
  }
}
