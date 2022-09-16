const ref = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  paragraf: document.querySelector('p'),
  colour: '',
};
ref.startBtn.addEventListener('click', onBtnStart);
ref.stopBtn.addEventListener('click', onBtnStop);

const divButton = document.createElement('div');
divButton.appendChild(ref.startBtn);
divButton.appendChild(ref.stopBtn);
ref.paragraf.appendChild(divButton);

divButton.style.cssText +=
  'display: flex; justify-content: center; align-items: center; width:100vw; height: 100vh; gap:20px';
ref.stopBtn.style.cssText += 'text-transform: uppercase; padding: 10px;';
ref.startBtn.style.cssText += 'text-transform: uppercase; padding: 10px;';
ref.stopBtn.disabled = true;

// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// }
console.log(divButton.style);
function getRandomHexColor() {
  divButton.style.backgroundColor = `#${Math.floor(
    Math.random() * 16777215
  ).toString(16)}`;
}

function onBtnStart() {
  ref.startBtn.disabled = true;
  ref.stopBtn.disabled = false;
  ref.colour = setInterval(getRandomHexColor, 1000);
  console.log(ref.startBtn);
}

function onBtnStop() {
  ref.startBtn.disabled = false;
  ref.stopBtn.disabled = true;
  if (ref.stopBtn.disabled) {
    console.log(clearInterval);
    clearInterval(ref.colour);
    console.log(ref.startBtn.disabled);
  }
}
