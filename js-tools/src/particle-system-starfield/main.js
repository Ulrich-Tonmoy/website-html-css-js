window.addEventListener("load", () => {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.strokeStyle = "white";

  const effect = new Effect(canvas, ctx);

  let lastTime = 0;
  function animate(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.handleParticles(ctx, deltaTime);
    requestAnimationFrame(animate);
  }
  animate(0);
});
