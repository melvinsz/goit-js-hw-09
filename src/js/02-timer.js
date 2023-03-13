import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startRef = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

const addLeadingZero = value => value.toString().padStart(2, '0');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.warning('Please choose a date in the future');
      startRef.disabled = true;
    } else startRef.disabled = false;
    startRef.addEventListener('click', () => onStartClick(selectedDates[0]));
  },
};

flatpickr('#datetime-picker', options);

function onStartClick(e) {
  const intervalId = setInterval(() => {
    const delta = e.getTime() - Date.now();

    if (delta <= 0) {
      clearInterval(intervalId);
      Notiflix.Notify.success('Countdown has finished!');
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(delta);
    daysRef.textContent = addLeadingZero(days);
    hoursRef.textContent = addLeadingZero(hours);
    minutesRef.textContent = addLeadingZero(minutes);
    secondsRef.textContent = addLeadingZero(seconds);
  }, 1000);
}
// // ___________________________________________________________________________

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
}
