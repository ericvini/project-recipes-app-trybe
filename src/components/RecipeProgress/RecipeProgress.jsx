import React from 'react';
import PropTypes from 'prop-types';
import RecipeToProgress from './RecipeToProgress';

const RecipeProgress = ({ recipe, commonProps }) => {
  const { isMeal } = commonProps;

  const id = isMeal ? recipe.idMeal : recipe.idDrink;
  const name = isMeal ? recipe.strMeal : recipe.strDrink;
  const image = isMeal ? recipe.strMealThumb : recipe.strDrinkThumb;

  const alcoholic = recipe.strAlcoholic || '';
  const area = recipe.strArea || '';

  const instructions = recipe.strInstructions;
  const category = recipe.strCategory;

  return (
    <RecipeToProgress
      id={ id }
      area={ area }
      image={ image }
      name={ name }
      category={ category }
      instructions={ instructions }
      alcoholic={ alcoholic }
      meal={ isMeal }
      commonProps={ commonProps }
    />
  );
};

RecipeProgress.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  commonProps: PropTypes.shape({
    isMeal: PropTypes.bool.isRequired,
    favorite: PropTypes.bool.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    measures: PropTypes.arrayOf(PropTypes.string).isRequired,
    inProgress: PropTypes.bool.isRequired,
    meals: PropTypes.arrayOf(PropTypes.object).isRequired,
    drinks: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default RecipeProgress;
