let ANGLE = 0;
let ANGLE_TO_REFERENCE_POINT = 0;

function main() {
  myCanvas.width = window.innerWidth;
  myCanvas.height = window.innerHeight;

  window.addEventListener("deviceorientation", onOrientationChange);
}

function showLabel() {
  const distanceToReferencePoint = slider.value;
  sliderLabel.innerHTML = "Distance to Reference Point: " + distanceToReferencePoint + " m";
}

function onOrientationChange(e) {
  ANGLE = e.alpha;
  const offset = -Math.PI / 2;
  const fixedAngle = (ANGLE - ANGLE_TO_REFERENCE_POINT) * (Math.PI / 180) + offset;

  const distanceToReferencePoint = slider.value;
  sliderLabel.innerHTML = "Distance to Reference Point: " + distanceToReferencePoint + " m";

  let distanceToTargetPoint = Math.abs(Math.tan(fixedAngle - offset)) * distanceToReferencePoint;

  const rad = Math.min(myCanvas.width, myCanvas.height) * 0.45;
  const movingTip = {
    x: myCanvas.width / 2 + Math.cos(fixedAngle) * rad,
    y: myCanvas.height / 2 + Math.sin(fixedAngle) * rad,
  };

  const ctx = myCanvas.getContext("2d");
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

  ctx.beginPath();
  ctx.fillStyle = "#47f";
  if (movingTip.y > myCanvas.height / 1.8) {
    ctx.fillStyle = "red";
    distanceToTargetPoint = 0;
  }
  if (movingTip.x > myCanvas.width / 2)
    ctx.arc(myCanvas.width / 2, myCanvas.height / 2, rad, offset, fixedAngle);
  else ctx.arc(myCanvas.width / 2, myCanvas.height / 2, rad, offset, fixedAngle, true);
  ctx.lineTo(myCanvas.width / 2, myCanvas.height / 2);
  ctx.fill();

  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.moveTo(myCanvas.width / 2, myCanvas.height / 2);
  ctx.lineTo(myCanvas.width / 2, myCanvas.height / 2 - rad);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = "#47f";
  ctx.moveTo(myCanvas.width / 2, myCanvas.height / 2);
  ctx.lineTo(movingTip.x, movingTip.y);
  ctx.stroke();

  ctx.beginPath();
  ctx.font = "55px Arial";
  ctx.textAlign = "center";
  ctx.fillText(
    distanceToTargetPoint.toFixed(1) + " meters",
    myCanvas.width / 2,
    myCanvas.height * 0.7
  );
}

function reset() {
  ANGLE_TO_REFERENCE_POINT = ANGLE;
}
