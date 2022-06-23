import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    inputTime: document.querySelector('#datetime-picker'),
    button: document.querySelector('button[data-start]'),
    deltaDays: document.querySelector('[data-days]'),
    deltaHours: document.querySelector('[data-hours]'),
    deltaMinutes: document.querySelector('[data-minutes]'),
    deltaSeconds: document.querySelector('[data-seconds]'),
}
let timerIntervalId = null;
let userDate = null;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
      if (selectedDates[0] < Date.now()) {
          refs.button.disabled = true;
          Notiflix.Notify.failure('Please choose a date in the future');
      } else {
          userDate = selectedDates[0];
          refs.button.disabled = false;
      };
  },
};

flatpickr(refs.inputTime, options);

refs.button.addEventListener('click', startTime);

function startTime(e) {
    e.preventDefault();
    timerIntervalId = setInterval(() => {
       let deltaTime = userDate - Date.now();
        if( deltaTime < 0) {
            clearInterval(timerIntervalId);
            return;
        }
        addTextContetnt(deltaTime);
    }, 1000);    
    }

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function addZero(value) {
    return String(value).padStart(2,'0');
};

function addTextContetnt(deltaTime){
    refs.deltaDays.textContent = addZero(convertMs(deltaTime).days);
    refs.deltaHours.textContent = addZero(convertMs(deltaTime).hours);
    refs.deltaMinutes.textContent = addZero(convertMs(deltaTime).minutes);
    refs.deltaSeconds.textContent = addZero(convertMs(deltaTime).seconds);
}
