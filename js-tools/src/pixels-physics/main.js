window.addEventListener("load", () => {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const effect = new Effect(canvas.width, canvas.height, ctx);
  effect.init(ctx);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.draw(ctx);
    effect.update();

    requestAnimationFrame(animate);
  }

  animate();

  warpButton.addEventListener("click", () => {
    effect.warp();
  });
  angler.addEventListener("click", () => {
    effect.toggle("angler", ctx);
  });
  fox.addEventListener("click", () => {
    effect.toggle("fox", ctx);
  });
  plant.addEventListener("click", () => {
    effect.toggle("plant", ctx);
  });
  spider.addEventListener("click", () => {
    effect.toggle("spider", ctx);
  });
  turtle.addEventListener("click", () => {
    effect.toggle("turtle", ctx);
  });
  all.addEventListener("click", () => {
    effect.toggle("all", ctx);
  });
});
