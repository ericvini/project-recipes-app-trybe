import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Meals from '../../services/meals-api';
import Drinks from '../../services/cocktails-api';

const ExploreFoodButtons = ({ meal }) => {
  const [randomFoodId, setRandomFoodId] = useState('');

  useEffect(() => {
    if (meal) {
      Meals.getRandomMeal()
        .then(({ idMeal }) => setRandomFoodId(idMeal))
        .catch((err) => console.log(err));
    }

    if (!meal) {
      Drinks.getRandomCocktail()
        .then(({ idDrink }) => setRandomFoodId(idDrink))
        .catch((err) => console.log(err));
    }
  }, [meal]);

  return (
    <div>
      <Link
        to={ meal ? '/explorar/comidas/ingredientes' : '/explorar/bebidas/ingredientes' }
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </Link>

      {
        meal && (
          <Link
            to={ meal ? '/explorar/comidas/area' : '/explorar/bebidas/area' }
            data-testid="explore-by-area"
          >
            Por Local de Origem
          </Link>
        )
      }

      <Link
        to={ meal ? `/comidas/${randomFoodId}` : `/bebidas/${randomFoodId}` }
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </Link>
    </div>
  );
};

ExploreFoodButtons.propTypes = { meal: PropTypes.bool.isRequired };

export default ExploreFoodButtons;
