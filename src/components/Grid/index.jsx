import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.css';

import Context from '../../Context';
import useLoadApiData from '../../Hooks/useLoadApiData';

const Grid = ({ isMeal }) => {
  useLoadApiData(isMeal);

  const {
    mealsData, mealsCategoryList, mealsFilteredData, handleClickCategoryMeals,
  } = useContext(Context).meal;

  const {
    drinksData, drinksCategoryList, drinksFilteredData, handleClickCategoryDrinks,
  } = useContext(Context).drink;

  const loadingData = () => {
    if (isMeal) return mealsData.length || mealsCategoryList.length;
    return drinksData.length || drinksCategoryList.length;
  };

  if (!loadingData()) {
    return <h1>Loading meals...</h1>;
  }

  return (
    <>
      <div>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => (
            isMeal
              ? handleClickCategoryMeals('All')
              : handleClickCategoryDrinks('All')
          ) }
        >
          All
        </button>
        {
          isMeal
            ? (
              mealsCategoryList.map(({ strCategory }) => (
                <button
                  type="button"
                  key={ strCategory }
                  data-testid={ `${strCategory}-category-filter` }
                  onClick={ () => handleClickCategoryMeals(strCategory) }
                >
                  { strCategory}
                </button>
              ))
            )
            : (
              drinksCategoryList.map(({ strCategory }) => (
                <button
                  type="button"
                  key={ strCategory }
                  data-testid={ `${strCategory}-category-filter` }
                  onClick={ () => handleClickCategoryDrinks(strCategory) }
                >
                  { strCategory}
                </button>
              ))
            )
        }
      </div>
      <div className="grid-list">
        {
          isMeal ? (
            mealsFilteredData.map(({ idMeal, strMeal, strMealThumb }, index) => (
              <Link
                to={ `/comidas/${idMeal}` }
                key={ idMeal }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  className="recipe-img"
                  width="150"
                  src={ strMealThumb }
                  alt="meal"
                  data-testid={ `${index}-card-img` }
                />
                <h2 data-testid={ `${index}-card-name` }>
                  {strMeal}
                </h2>
              </Link>
            ))
          ) : (
            drinksFilteredData.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
              <Link
                to={ `/bebidas/${idDrink}` }
                key={ idDrink }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  className="recipe-img"
                  width="150"
                  src={ strDrinkThumb }
                  alt="drink"
                  data-testid={ `${index}-card-img` }
                />
                <h2 data-testid={ `${index}-card-name` }>
                  {strDrink}
                </h2>
              </Link>
            ))
          )
        }
      </div>
    </>
  );
};

Grid.defaultProps = { isMeal: false };

Grid.propTypes = { isMeal: PropTypes.bool };

export default Grid;
