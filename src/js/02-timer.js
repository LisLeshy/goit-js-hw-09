// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const ref = {
  inputDate: document.querySelector('input'),
  startBtn: document.querySelector('[data-start]'),

  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),

  containerForTime: document.querySelector('.timer'),
  divField: document.querySelectorAll('.field'),
  spanForTimeNumber: document.querySelectorAll('.value'),
  spanForTimeName: document.querySelectorAll('.label'),
};

let selectedTime;
let endTime;
let displyTime = 0;

ref.startBtn.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),

  minuteIncrement: 1,

  onClose(selectedDates) {
    // console.log(selectedDates[0]);

    checkInput(selectedDates);
  },
};

function checkInput(selectedDates) {
  selectedTime = selectedDates[0].getTime();
  endTime = Date.now();
  // console.log(selectedTime);
  if (selectedTime < endTime) {
    return Notify.failure('Please choose a date in the future');
  } else {
    ref.startBtn.disabled = false;
  }
}

flatpickr('#datetime-picker', options);

function timer() {
  // console.log(displyTime);
  const counter = setInterval(
    () => {
      ref.startBtn.disabled = true;
      displyTime = selectedTime - Date.now();

      // console.log(displyTime);

      displyTime = convertMs(displyTime);

      // console.log(Number(displyTime.minutes));
      // console.log(Number(displyTime.seconds));
      let amoutDate = Number(
        displyTime.seconds +
          displyTime.minutes +
          displyTime.hours +
          displyTime.days
      );
      console.log(amoutDate);
      if (amoutDate <= 0) {
        clearInterval(counter);
        ref.startBtn.disabled = true;
        ref.inputDate.disabled = true;
      }
    },

    1000
  );
}

ref.startBtn.addEventListener('click', timer);
const addLeadingZero = value => {
  return String(value).padStart(2, '0');
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
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  createMarkup({ days, hours, minutes, seconds });

  return { days, hours, minutes, seconds };
}

ref.startBtn.addEventListener('click', convertMs);
function createMarkup({ days, hours, minutes, seconds }) {
  ref.days.textContent = days;
  ref.hours.textContent = hours;
  ref.minutes.textContent = minutes;
  ref.seconds.textContent = seconds;
}

ref.inputDate.style.cssText += 'width: 230px; height: 30px';
ref.startBtn.style.cssText += 'width: 50px; height: 30px';
ref.containerForTime.style.cssText +=
  'display: flex; justify-content: space-between; align-items: center; width:300px; padding: 20px';
ref.divField.forEach(key => {
  key.style.cssText +=
    'display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 20px;';
});
ref.spanForTimeNumber.forEach(key => {
  key.style.cssText += 'font-size: 28px; font-weight: 600;';
});
ref.spanForTimeName.forEach(key => {
  key.style.cssText +=
    'font-size: 12px; text-transform: uppercase; font-weight: 500;';
});
