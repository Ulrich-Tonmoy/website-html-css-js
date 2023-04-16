window.addEventListener("load", () => {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const effect = new Effect(ctx, canvas.width, canvas.height);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.render();
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height);
  });
});
