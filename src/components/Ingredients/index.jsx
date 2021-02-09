import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.css';

import Meals from '../../services/meals-api';
import Drinks from '../../services/cocktails-api';

const Ingredients = ({ meal }) => {
  const [ingredientList, setIngredientList] = useState([]);

  useEffect(() => {
    const amountToShow = 12;
    if (meal) {
      Meals.getMealIngredientList(amountToShow)
        .then((res) => setIngredientList(res))
        .catch((err) => console.log(err));
    }

    if (!meal) {
      Drinks.getCocktailIngredientList(amountToShow)
        .then((res) => setIngredientList(res))
        .catch((err) => console.log(err));
    }
  }, [meal]);

  return (
    <div className="ingredient-list">
      {
        ingredientList.map((ingredient, index) => {
          const name = ingredient.strIngredient || ingredient.strIngredient1;
          return (
            <Link
              to={ meal ? `/comidas?ing=${name}` : `/bebidas?ing=${name}` }
              key={ name }
              data-testid={ `${index}-ingredient-card` }
            >
              <img
                src={
                  meal
                    ? `https://www.themealdb.com/images/ingredients/${name}-Small.png`
                    : `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png`
                }
                width="150"
                alt="ingredient"
                data-testid={ `${index}-card-img` }
              />
              <h1 data-testid={ `${index}-card-name` }>
                {name}
              </h1>
            </Link>
          );
        })
      }
    </div>
  );
};

Ingredients.propTypes = { meal: PropTypes.bool.isRequired };

export default Ingredients;
