const startRef = document.querySelector('[data-start]');
const stopRef = document.querySelector('[data-stop]');

let timerId = null;

startRef.addEventListener('click', onStartClick);
stopRef.addEventListener('click', onStopClick);

function onStartClick(e) {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startRef.disabled = true;
}

function onStopClick(e) {
  clearInterval(timerId);
  startRef.disabled = false;
  document.body.style.backgroundColor = '';
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
