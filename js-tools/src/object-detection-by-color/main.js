const myVideo = document.createElement("video");
detectionColor.value = "#ff0000";
let color = hextorgb(detectionColor.value);

detectionColor.addEventListener("input", (e) => {
  color = hextorgb(e.target.value);
});

navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((rawData) => {
    myVideo.srcObject = rawData;
    myVideo.play();
    myVideo.onloadeddata = () => {
      myCanvas.width = myVideo.videoWidth;
      myCanvas.height = myVideo.videoHeight;
      new Effect(myCanvas, myVideo);
    };
  })
  .catch((err) => {
    alert(err);
  });
