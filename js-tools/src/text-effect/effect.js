class Effect {
  constructor(context, canvasWidth, canvasHeight) {
    this.context = context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.textX = this.canvasWidth / 2;
    this.textY = this.canvasHeight / 2;
    this.fontSize = 130;
    this.lineHeight = this.fontSize * 0.9;
    this.maxTextWidth = this.canvasWidth * 0.8;
    this.verticalOffset = 0;

    this.particles = [];
    this.gap = 3;
    this.mouse = {
      radius: 20000,
      x: 0,
      y: 0,
    };
    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });

    this.textInput = textInput;
    this.textInput.addEventListener("keyup", (e) => {
      if (e.key !== " ") {
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        this.wrapText(e.target.value);
      }
    });

    this.textInput.value = "JavaScript TypeScript";
    this.wrapText(this.textInput.value);
  }

  #drawAxis() {
    // Drawing axis to measure the text position
    this.context.lineWidth = 3;
    this.context.strokeStyle = "red";
    this.context.beginPath();
    this.context.moveTo(canvas.width / 2, 0);
    this.context.lineTo(canvas.width / 2, canvas.height);
    this.context.stroke();
    this.context.strokeStyle = "green";
    this.context.beginPath();
    this.context.moveTo(0, canvas.height / 2);
    this.context.lineTo(canvas.width, canvas.height / 2);
    this.context.stroke();
  }

  wrapText(text) {
    // this.#drawAxis();
    const gradient = this.context.createLinearGradient(0, 0, this.canvasWidth, this.canvasHeight);
    // gradient.addColorStop(0.3, "red");
    // gradient.addColorStop(0.5, "fuchsia");
    // gradient.addColorStop(0.7, "purple");

    // gradient.addColorStop(0.3, "red");
    // gradient.addColorStop(0.5, "orange");
    // gradient.addColorStop(0.7, "yellow");

    gradient.addColorStop(0.2, "red");
    gradient.addColorStop(0.3, "orange");
    gradient.addColorStop(0.4, "yellow");
    gradient.addColorStop(0.5, "fuchsia");
    gradient.addColorStop(0.6, "purple");
    gradient.addColorStop(0.7, "blue");

    this.context.fillStyle = gradient;
    // this.context.font = `${this.fontSize}px Helvetica`;
    this.context.font = `${this.fontSize}px Impact`;
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    // this.context.lineWidth = 3;
    // this.context.letterSpacing = "5px";
    this.context.strokeStyle = "white";

    // Break text to multiline
    let linesArray = [];
    let lineCounter = 0;
    let line = "";
    let words = text.split(" ");
    for (let i = 0; i < words.length; i++) {
      let testLine = line + words[i] + " ";
      if (this.context.measureText(testLine).width > this.maxTextWidth) {
        line = words[i] + " ";
        lineCounter++;
      } else {
        line = testLine;
      }
      linesArray[lineCounter] = line;
    }
    let textHeight = this.lineHeight * lineCounter;
    this.textY = canvas.height / 2 - textHeight / 2 + this.verticalOffset;
    linesArray.forEach((line, index) => {
      this.context.fillText(line, canvas.width / 2, this.textY + index * this.lineHeight);
      this.context.strokeText(line, canvas.width / 2, this.textY + index * this.lineHeight);
    });
    this.convertToParticles();
  }

  convertToParticles() {
    this.particles = [];
    const pixels = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight).data;
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    for (let y = 0; y < this.canvasHeight; y += this.gap) {
      for (let x = 0; x < this.canvasWidth; x += this.gap) {
        const index = (y * this.canvasWidth + x) * 4;
        const alpha = pixels[index + 3];
        if (alpha > 0) {
          const red = pixels[index];
          const green = pixels[index + 1];
          const blue = pixels[index + 2];
          const color = `rgb( ${red} , ${green} , ${blue} )`;
          this.particles.push(new Particle(this, x, y, color));
        }
      }
    }
  }

  render() {
    this.particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
  }

  resize(width, height) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.textX = this.canvasWidth / 2;
    this.textY = this.canvasHeight / 2;
    this.maxTextWidth = this.canvasWidth * 0.8;
    this.wrapText(this.textInput.value);
  }
}
