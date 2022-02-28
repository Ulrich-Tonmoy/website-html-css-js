const video = document.querySelector("video");
const textEl = document.querySelector("[data-text]");
const lang = "eng";

async function setup() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    video.addEventListener("playing", async () => {
        const worker = Tesseract.createWorker();
        await worker.load();
        await worker.loadLanguage(lang);
        await worker.initialize(lang);

        const canvas = document.createElement("canvas");
        canvas.width = video.width;
        canvas.height = video.height;

        document.addEventListener("click", async (e) => {
            canvas.getContext("2d").drawImage(video, 0, 0, video.width, video.height);
            const {
                data: { text },
            } = await worker.recognize(canvas);

            speechSynthesis.speak(new SpeechSynthesisUtterance(text.replace(/\s/g, " ")));

            textEl.textContent = text;
        });
    });
}

setup();
