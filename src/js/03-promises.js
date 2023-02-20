import Notiflix from 'notiflix';

const form = document.querySelector('form');
let promisNumber = 1;

const onSubmitCreatePromise = event => {
  event.preventDefault();

  const {
    elements: { delay, step, amount },
  } = event.currentTarget;
  let promisDelay = Number(delay.value) + Number(step.value);

  if (Number(amount.value == 0)) {
    return;
  }

  createPromise(promisNumber, delay.value)
    .then(value => {
      Notiflix.Notify.success(value);
    })
    .catch(value => {
      Notiflix.Notify.failure(value);
    });

  for (let i = 1; i < amount.value; i++) {
    promisNumber += 1;
    createPromise(promisNumber, promisDelay)
      .then(value => {
        Notiflix.Notify.success(value);
      })
      .catch(value => {
        Notiflix.Notify.failure(value);
      });
    promisDelay += Number(step.value);
  }

  promisNumber = 1;
};

form.addEventListener('submit', onSubmitCreatePromise);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

// альтернативний варіант

// timerId = setInterval(() => {
//   promisNumber += 1;
//   createPromise(promisNumber, promisDelay)
//     .then(value => {
//       Notiflix.Notify.success(value);
//     })
//     .catch(value => {
//       Notiflix.Notify.failure(value);
//     });

//   promisDelay += Number(step.value);
//   if (promisNumber === Number(amount.value)) {
//     clearInterval(timerId);
// promisDelay = 0;
// promisNumber = 1;
//   }
// }, step.value);

// const onSubmitCreatePromise = event => {
//   event.preventDefault();

// const {
//   elements: { delay, step, amount },
// } = event.currentTarget;

//   let promisDelay = Number(delay.value) + Number(step.value);

//   setTimeout(() => {
// createPromise(promisNumber, delay.value)
//   .then(value => {
//     Notiflix.Notify.success(value);
//   })
//   .catch(value => {
//     Notiflix.Notify.failure(value);
//   })
//   .finally(() => {
//     return (promisNumber += 1);
//   });

// timerId = setInterval(() => {
//   createPromise(promisNumber, promisDelay)
//     .then(value => {
//       Notiflix.Notify.success(value);
//     })
//     .catch(value => {
//       Notiflix.Notify.failure(value);
//     });
//   promisNumber += 1;
//   promisDelay += Number(step.value);
//   if (promisNumber > Number(amount.value)) {
//     clearInterval(timerId);
//     promisDelay = 0;
//     promisNumber = 1;
//   }
// }, step.value);
//   }, delay.value);
// };

// function createPromise(position, delay) {
//   return new Promise((resolve, reject) => {
//     const shouldResolve = Math.random() > 0.3;
//     if (shouldResolve) {
//       resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
//     } else {
//       reject(`❌ Rejected promise ${position} in ${delay}ms`);
//     }
//   });
// }
