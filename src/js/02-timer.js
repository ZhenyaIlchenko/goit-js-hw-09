import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.querySelector('input#datetime-picker'),
  button: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
const currentDate = new Date();
let flikerDate = null;

function checkControlAvailability() {
  if (flikerDate <= currentDate) {
    refs.button.setAttribute('disabled', '');
  }
}
checkControlAvailability();

function selectDate() {
  if (flikerDate <= currentDate) {
    alert('Please choose a date in the future');
  } else {
    refs.button.removeAttribute('disabled');
  }
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    flikerDate = selectedDates[0];
    selectDate();
  },
};

const fpInput = flatpickr(refs.input, options);

refs.button.addEventListener('click', () => {
  timer.start();
});

const timer = {
  start() {
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();

      const setIntervalTime = flikerDate - currentTime;
      console.log(setIntervalTime);
      let time = convertMs(setIntervalTime);
      updateTimer(time);
    }, 1000);
  },
  stop() {
    if () {
    }
    clearInterval(this.intervalId);
  },
};

function updateTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

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
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
