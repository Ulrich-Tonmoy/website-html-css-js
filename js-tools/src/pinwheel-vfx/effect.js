class Effect {
  constructor(canvas, video) {
    this.canvas = canvas;
    this.video = video;
    this.ctx = canvas.getContext("2d");

    this.pinwheel = new Pinwheel();

    this.#animate();
  }

  #animate() {
    const { ctx, canvas, video } = this;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const locs = getLocationsWithColor(imgData, color);
    if (locs.length > 0) {
      const center = average(locs);
      const size = Math.sqrt(locs.length) * 5;
      this.pinwheel.update(ctx, center, size);
    }
    requestAnimationFrame(this.#animate.bind(this));
  }
}
