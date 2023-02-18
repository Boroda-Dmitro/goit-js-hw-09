const refs = {
  bodyEl: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  startStop: document.querySelector('button[data-stop]'),
};
let timerId = null;

refs.startStop.disabled = 'true';

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const intervalBackgroundColorChanger = () => {
  timerId = setInterval(() => {
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

const startBtnOnClick = () => {
    intervalBackgroundColorChanger();
    refs.startBtn.disabled = 'true';
    refs.startStop.disabled = '';
}

const stopBtnOnClick = () => {
    clearInterval(timerId);
    refs.startBtn.disabled = '';
    refs.startStop.disabled = 'true';
}

refs.startBtn.addEventListener('click', startBtnOnClick);

refs.startStop.addEventListener('click', stopBtnOnClick);

