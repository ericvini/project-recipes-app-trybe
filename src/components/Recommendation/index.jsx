import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Recommendation = ({ page, recommendations }) => {
  const thirdItem = 2;

  if (page === 'meal') {
    return (
      <>
        <h2>Recomendadas</h2>
        <div className="recommended-container">
          {
            recommendations.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
              <Link
                to={ `/bebidas/${idDrink}` }
                key={ idDrink }
                data-testid={ `${index}-recomendation-card` }
              >
                <img
                  style={ index >= thirdItem ? { display: 'none' } : {} }
                  className="recipe-img"
                  width="150"
                  src={ strDrinkThumb }
                  alt="drink"
                  data-testid={ `${index}-card-img` }
                />
                <h2
                  style={ index >= thirdItem ? { display: 'none' } : {} }
                  data-testid={ `${index}-recomendation-title` }
                >
                  {strDrink}
                </h2>
              </Link>
            ))
          }
        </div>
      </>
    );
  }

  return (
    <>
      <h2>Recomendadas</h2>
      <div className="recommended-container">
        {
          recommendations.map(({ idMeal, strMealThumb, strMeal }, index) => (
            <Link
              to={ `/comidas/${idMeal}` }
              key={ idMeal }
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                style={ index >= thirdItem ? { display: 'none' } : {} }
                className="recipe-img"
                width="150"
                src={ strMealThumb }
                alt="meal"
                data-testid={ `${index}-card-img` }
              />
              <h2
                style={ index >= thirdItem ? { display: 'none' } : {} }
                data-testid={ `${index}-recomendation-title` }
              >
                {strMeal}
              </h2>
            </Link>
          ))
        }
      </div>
    </>
  );
};

Recommendation.propTypes = {
  page: PropTypes.string.isRequired,
  recommendations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Recommendation;
