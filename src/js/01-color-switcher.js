
const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};
let timeIntervalId = null;

refs.btnStart.disabled = false;



refs.btnStart.addEventListener('click', changeColor);
refs.btnStop.addEventListener('click', stopChange);

function changeColor () {
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
  timeIntervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000)
};

function stopChange () {
  clearInterval(timeIntervalId);
  refs.btnStop.disabled = true;
  refs.btnStart.disabled = false;
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}