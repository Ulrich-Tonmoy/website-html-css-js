const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
gradient.addColorStop(0, "white");
gradient.addColorStop(1, "gold");
ctx.fillStyle = gradient;
ctx.strokeStyle = gradient;

const effect = new Effect(canvas, ctx);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  effect.handleParticles(ctx);
  requestAnimationFrame(animate);
}
animate();
