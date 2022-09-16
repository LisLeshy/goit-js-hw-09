import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');
formRef.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();

  let delay = Number(e.currentTarget.delay.value);
  console.log(e.currentTarget.delay.value);
  const step = Number(e.currentTarget.step.value);
  const amount = Number(e.currentTarget.amount.value);

  // createPromise(2, 1500)
  // .then(({ position, delay }) => {
  //   console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  // })
  // .catch(({ position, delay }) => {
  //   console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  // });

  for (let position = 1; position <= amount; position += 1) {
    console.log(delay);
    console.log(position);
    createPromise(position, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
            useIcon: false,
          });
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
            useIcon: false,
          });
        }, delay);
      });
    //   .finally(() => {
    // delay = delay += step;
    // });
    delay = delay += step;
  }
}
// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }

function createPromise(position, delay) {
  console.log(delay);
  console.log(position);
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}
