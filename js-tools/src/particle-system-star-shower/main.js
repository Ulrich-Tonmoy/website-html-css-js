let gradient;
window.addEventListener("load", function () {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "white");
  gradient.addColorStop(0.5, "magenta");
  gradient.addColorStop(1, "pink");
  ctx.fillStyle = gradient;
  ctx.strokeStyle = "white";

  const effect = new Effect(canvas, ctx);

  function animate() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    effect.handleParticles(ctx);
    requestAnimationFrame(animate);
  }
  animate();
});
