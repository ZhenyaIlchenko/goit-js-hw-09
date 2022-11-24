function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let intervalId = null;

const refs = {
  body: document.querySelector('body'),
  buttonStart: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
};

refs.buttonStart.addEventListener('click', handleClickStart);
refs.buttonStop.addEventListener('click', handleClickStop);

function checkControlAvailability() {
  if (intervalId) {
    refs.buttonStart.setAttribute('disabled', '');
    refs.buttonStop.removeAttribute('disabled');
  } else {
    refs.buttonStart.removeAttribute('disabled');
    refs.buttonStop.setAttribute('disabled', '');
  }
}

checkControlAvailability();

function handleClickStart() {
  const randomColor = getRandomHexColor();
  refs.body.style.backgroundColor = randomColor;

  if (!intervalId) {
    intervalId = setInterval(handleClickStart, 1000);
  }
  checkControlAvailability();
}

function handleClickStop() {
  clearInterval(intervalId);
  intervalId = null;
  checkControlAvailability();
}
