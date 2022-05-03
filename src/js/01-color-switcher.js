function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let intervalID = null;
stopButton.disabled = true;

startButton.addEventListener('click', onStartButtonClick);
stopButton.addEventListener('click', onStopButtonClick);

// function onStartButtonClick() {
//     startButton.disabled = true;
//     stopButton.disabled = false;
//     intervalID = setInterval(() => {
//         document.body.style.backgroundColor = getRandomHexColor()
//     }, 1000);
// };

// function onStopButtonClick() {
//     clearInterval(intervalID);
//     startButton.disabled = false;
//     stopButton.disabled = true;
// };

function onStartButtonClick(event) {

    event.target.setAttribute('disabled', "");
    stopButton.removeAttribute('disabled');

    intervalID = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor()
    }, 1000);

};

function onStopButtonClick(event) {
    
    clearInterval(intervalID);
    event.target.setAttribute('disabled', "");
    startButton.removeAttribute('disabled');

};