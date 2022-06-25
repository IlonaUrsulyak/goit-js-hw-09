import { Notify } from 'notiflix';

const refs = {
  form: document.querySelector('form'),
}

refs.form.addEventListener('submit', onSendForm);

function onSendForm(event) {
  event.preventDefault();
  const { delay, step, amount } = event.target.elements;
  let delayCount = Number(delay.value);

  for (let i = 1; i <= amount.value; i += 1){
    createPromise(i, delayCount)
      .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`,{useIcon: false});
  })
  .catch(({ position, delay }) => {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`,{useIcon: false});
  });
    delayCount += Number(step.value);
  }

  event.target.reset();
};


function createPromise(position, delay) {
  
    return new Promise((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
    resolve({ position, delay });
  } else {
    reject({ position, delay });
      }
      }, delay)
})
};




