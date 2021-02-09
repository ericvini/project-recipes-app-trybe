const streakIngredient = (key, event) => {
  console.log(key, event);
  const { target } = event;
  const element = document.getElementById(key);
  const lineTh = 'line-through';

  if (target.checked === true && element.style.textDecoration !== lineTh) {
    element.style.textDecoration = lineTh;
  }
  if (target.checked === false && element.style.textDecoration === lineTh) {
    element.style.textDecoration = '';
  }
};

export default {
  streakIngredient,
};
