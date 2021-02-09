import React from 'react';
import PropTypes from 'prop-types';

function CardMeals(props) {
  const { item, index } = props;
  const { strMeal, strMealThumb } = item;
  return (
    <div key={ index } data-testid={ `${index}-recipe-card` }>
      <img data-testid={ `${index}-card-img` } src={ strMealThumb } alt={ strMeal } />
      <p data-testid={ `${index}-card-name` }>{strMeal}</p>
    </div>
  );
}

CardMeals.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardMeals;
