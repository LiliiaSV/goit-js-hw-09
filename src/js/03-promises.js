import Notiflix from 'notiflix';

const formElement = document.querySelector('.form');
const delayElement = document.querySelector('[name="delay"]');
const stepElement = document.querySelector('[name="step"]');
const amountElement = document.querySelector('[name="amount"]');

formElement.addEventListener('submit', onHandleForm);

function onHandleForm(event) {
  event.preventDefault();

  let delay = Number(delayElement.value);
  let step = Number(stepElement.value);
  let amount = Number(amountElement.value);
  let position = 0;

  if (amount <= 0 || delay < 0 || step <0 ) {
    Notiflix.Notify.failure(`Please input correct values (>=0)`);
  }

  for (let i = 1; i <= amount; i += 1) {
    position = i;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch (({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }
  formElement.reset();
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
        reject({ position, delay });
    }, delay);
  });
};
