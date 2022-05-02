import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';

const refs = {
    startButton: document.querySelector('[data-start]'),
    leftDays: document.querySelector('[data-days]'),
    leftHours: document.querySelector('[data-hours]'),
    leftMinutes: document.querySelector('[data-minutes]'),
    leftSeconds: document.querySelector('[data-seconds]'),
};

refs.startButton.disabled = true;

const options = {

    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
        const currentDate = Date.now();
        const selectedDate = selectedDates[0].getTime();

        if (currentDate > selectedDate) {
            Notiflix.Notify.failure('Please choose a date in the future');
            return;
        };

    refs.startButton.disabled = false;
    },

};

const flatPickr = flatpickr('#datetime-picker', options);

const timer = {
    intervalID: null,
    isActive: false,

    start() {
        if (this.isActive) return;

        this.isActive = true;
        const selectedDate = flatPickr.selectedDates[0].getTime();
        this.intervalID = setInterval(() => {
            const currentDate = Date.now();
            const deltaTime = selectedDate - currentDate;
            if (deltaTime < 0) {
                clearInterval(this.intervalID);
                this.isActive = false;
                return;
            };
            const timerTime = convertMs(deltaTime);
            onTimerShownTime(timerTime);
        }, 1000);
    },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

  // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

function onTimerShownTime({ days, hours, minutes, seconds }) {
    refs.leftDays.textContent = `${days}`;
    refs.leftHours.textContent = `${hours}`;
    refs.leftMinutes.textContent = `${minutes}`;
    refs.leftSeconds.textContent = `${seconds}`;
}

refs.startButton.addEventListener('click', () => {
    timer.start();
});