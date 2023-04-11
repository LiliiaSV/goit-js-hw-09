function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

  const startButton = document.querySelector('[data-start]');
  const stopButton = document.querySelector('[data-stop]');

  startButton.addEventListener('click', colorSwitcherStart);
  stopButton.addEventListener('click', colorSwitcherStop);

  let timerId = null;

  function colorSwitcherStart () {
    document.body.style.backgroundColor = getRandomHexColor();

    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);

    stopButton.removeAttribute('disabled');
    startButton.setAttribute('disabled', 'true');
    };

   function colorSwitcherStop() {
    clearInterval(timerId);

    startButton.removeAttribute('disabled');
    stopButton.setAttribute('disabled', '');
   };