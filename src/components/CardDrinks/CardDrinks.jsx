import React from 'react';
import PropTypes from 'prop-types';

function CardDrinks(props) {
  const { item, index } = props;
  const { strDrink, strDrinkThumb } = item;
  return (
    <div key={ index } data-testid={ `${index}-recipe-card` }>
      <img data-testid={ `${index}-card-img` } src={ strDrinkThumb } alt={ strDrink } />
      <p data-testid={ `${index}-card-name` }>{strDrink}</p>
    </div>
  );
}

CardDrinks.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardDrinks;
