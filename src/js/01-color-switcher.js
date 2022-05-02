function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let intervalID = null;
stopButton.disabled = true;

startButton.addEventListener('click', onStartButtonClick);
stopButton.addEventListener('click', onStopButtonClick);

function onStartButtonClick(event) {
    startButton.disabled = true;
    stopButton.disabled = false;
    intervalID = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor()
    }, 1000);
};

function onStopButtonClick() {
    clearInterval(intervalID);
    startButton.disabled = false;
    stopButton.disabled = true;
};


