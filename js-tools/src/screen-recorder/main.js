const startBtn = document.getElementById("btn");
const downloadLink = document.getElementById("link");
let blob = null;
let videoStream = null;

startBtn.addEventListener("click", startScreenCapturing);

async function startScreenCapturing() {
  if (!navigator.mediaDevices.getDisplayMedia) {
    return alert("Screen capturing not supported in your browser.");
  }

  try {
    if (!videoStream?.active) {
      videoStream = await navigator.mediaDevices.getDisplayMedia({
        audio: true,
        surfaceSwitching: "include",
      });

      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
          suppressLocalAudioPlayback: false,
        },
      });

      const audioTrack = audioStream.getTracks()[0];
      videoStream.addTrack(audioTrack);

      recordStream(videoStream);
    } else {
      throw new Error(
        "There is an ongoing recording. Please, stop it before recording a new one",
      );
    }
  } catch (error) {
    console.error(error);
    alert(error);
  }
}

function recordStream(stream) {
  countdown();
  const mediaRecorder = new MediaRecorder(stream, {
    mimeType: "video/webm; codecs=vp8,opus",
  });

  const recordedChunks = [];
  mediaRecorder.addEventListener("dataavailable", (e) => recordedChunks.push(e.data));

  // Stop recording and audio streaming when video streaming stops
  stream.getVideoTracks()[0].addEventListener("ended", () => {
    mediaRecorder.stop();
    stream.getAudioTracks()[0].stop();
  });

  mediaRecorder.addEventListener("stop", () => {
    createVideoBlob(recordedChunks);
    showRecordedVideo(blob);
  });

  setTimeout(() => mediaRecorder.start(1000), 4000);
}

function countdown() {
  const countDownElement = document.getElementById("countdown");
  countDownElement.style.display = "grid";
  let count = 3;

  function reduceCount() {
    countDownElement.textContent = count;
    count--;

    if (count >= 0) {
      setTimeout(reduceCount, 1000);
    } else {
      countDownElement.style.display = "none";
    }
  }

  reduceCount();
}

function createVideoBlob(recordedChunks) {
  blob = new Blob(recordedChunks, {
    type: recordedChunks[0].type,
  });
}

function showRecordedVideo() {
  const video = document.getElementById("video");
  video.src = URL.createObjectURL(blob);
  calculateVideoDuration(video);
}

// Recalculates video duration
function calculateVideoDuration(videoElement) {
  videoElement.addEventListener("loadedmetadata", () => {
    if (videoElement.duration === Infinity) {
      videoElement.currentTime = 1e101;
      videoElement.addEventListener(
        "timeupdate",
        () => {
          videoElement.currentTime = 0;
        },
        { once: true },
      );
    }
  });
}

downloadLink.addEventListener("click", () => {
  downloadLink.href = URL.createObjectURL(blob);
  const fileName = prompt("What is the name of your video?");
  downloadLink.download = `${fileName}.webm`;
  downloadLink.type = "video/webm";
});
