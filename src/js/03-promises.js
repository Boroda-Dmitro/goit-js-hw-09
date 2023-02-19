import Notiflix from 'notiflix';

const form = document.querySelector('form');
let timerId = null;
let promisNumber = 1;

const onSubmitCreatePromise = event => {
  event.preventDefault();

  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  let promisDelay = Number(delay.value) + Number(step.value);

  setTimeout(() => {
    createPromise(promisNumber, delay.value)
      .then(value => {
        Notiflix.Notify.success(value);
      })
      .catch(value => {
        Notiflix.Notify.failure(value);
      })
      .finally(() => {
        return (promisNumber += 1);
      });

    timerId = setInterval(() => {
      createPromise(promisNumber, promisDelay)
        .then(value => {
          Notiflix.Notify.success(value);
        })
        .catch(value => {
          Notiflix.Notify.failure(value);
        });
      promisNumber += 1;
      promisDelay += Number(step.value);
      if (promisNumber > Number(amount.value)) {
        clearInterval(timerId);
        promisDelay = 0;
        promisNumber = 1;
      }
    }, step.value);
  }, delay.value);
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
    } else {
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }
  });
}

form.addEventListener('submit', onSubmitCreatePromise);
