import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('input[type="text"]');
const startBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

startBtn.disabled = true;

let currentDate = new Date();
let selectedDate = null; 
let timerId = null;
let deltaTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      selectedDate = selectedDates[0];

      if (selectedDate <= currentDate) {
          Notify.failure('Please choose a date in the future');
          startBtn.disabled = true;
      } else {
          startBtn.disabled = false;
      }
  },
};

flatpickr(input, options);

startBtn.addEventListener('click', onStartTimer);

function onStartTimer() {
    startBtn.disabled = true;
    input.disabled = true;

    currentDate = new Date().getTime();
    selectedDate = selectedDate.getTime();
    deltaTime = selectedDate - currentDate;

    updateHTML(convertMs(deltaTime));
    startTimer();
}

function startTimer() {
    timerId = setInterval(() => {
        deltaTime -= 1000;
        updateHTML(convertMs(deltaTime));

        if (deltaTime < 1000) {
            clearInterval(timerId);
            input.disabled = false;
        }
    }, 1000);
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;


    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function updateHTML({ days, hours, minutes, seconds }) {
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
}