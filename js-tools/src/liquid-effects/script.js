const ctx = canvas1.getContext("2d");
canvas1.width = window.innerWidth;
canvas1.height = window.innerHeight;
ctx.fillStyle = "white";
ctx.strokeStyle = "white";

const ctx2 = canvas2.getContext("2d");
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;
ctx2.strokeStyle = "white";
ctx2.lineWidth = 2;

const gradient = ctx.createLinearGradient(0, 0, canvas1.width, canvas1.height);
gradient.addColorStop(0, "white");
gradient.addColorStop(0.5, "gold");
gradient.addColorStop(1, "orangered");
ctx.fillStyle = gradient;

const effect = new Effect(canvas1, ctx);

function animate() {
  ctx.clearRect(0, 0, canvas1.width, canvas1.height);
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  effect.handleParticles(ctx, ctx2);
  requestAnimationFrame(animate);
}
animate();
