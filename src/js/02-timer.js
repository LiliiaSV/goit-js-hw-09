import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const datePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector(['data-days']);
const hoursElement = document.querySelector(['data-hours']);
const minutesElement = document.querySelector(['data-minutes']);
const secondsElement = document.querySelector(['data-seconds']);

let currentDate = new Date();
let selectedDate = null;
let deltaDate = null;
let intervalId = null;

startButton.setAttribute('disabled', 'true');
startButton.addEventListener('click', onStartTimer);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0];
        deltaDate = selectedDate - currentDate;

        if ( selectedDate <= currentDate) {
            return Notiflix.Notify.failure('Please choose a date in the future');
        }

        startButton.removeAttribute('disabled');
    },
  }; 

const flatPickr = flatpickr(datePicker, options);

function onStartTimer(event) {
    updateTimer(convertMs(deltaDate));
    startTimer();
    startButton.setAttribute('disabled', 'true');
    datePicker.setAttribute('disabled', 'true');
};

function pad(value) {
    return String(value).padStart(2, '0');
};

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = pad(Math.floor(ms / day));
    // Remaining hours
    const hours = pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
};

function startTimer() {
    intervalId = setInterval(() => {
        stopTimer();

        deltaDate -= 1000;
        convertMs(deltaTime);
        updateTimer(convertMs(deltaDate));
    }, 1000);
};

function stopTimer() {
    if ((daysElement.textContent === '00') && 
        (hoursElement.textContent === '00') &&
        (minutesElement.textContent === '00') &&
        (secondsElement.textContent === '01')) 
        {
        clearInterval(intervalId);
    }
};

function updateTimer({ days, hours, minutes, seconds }) {
    daysElement.textContent = days.toString();
    hoursElement.textContent = hours.toString();
    minutesElement.textContent = minutes.toString();
    secondsElement.textContent = seconds.toString();
};
