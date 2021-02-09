import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import funcsRecipes from './functionsRecipeToProgress';

import Context from '../../Context';

import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

const RecipeToProgress = ({ id, area, image, name, category,
  instructions, alcoholic, meal, commonProps }) => {
  const navigate = useHistory();
  const { handleClickStartRecipe, handleClickFavorite } = useContext(Context);

  const { favorite, ingredients, inProgress } = commonProps;
  const btnvalue = 'Finalizar Receita';
  const [copied, setCopied] = useState(false);
  const [check, setCheck] = useState(true);
  const pathFood = `http://localhost:3000/comidas/${id}`;
  const pathDrink = `http://localhost:3000/bebidas/${id}`;
  const handleClickShare = (path) => {
    if (meal) {
      path = pathFood;
    } else {
      path = pathDrink;
    }
    copy(path)
      .then(() => setCopied(true))
      .catch((err) => console.log(err));
  };
  const verifyCheckbox = () => {
    const checked = document.querySelectorAll('input:checked').length;
    console.log(checked);
    console.log(ingredients.length);

    if (checked === ingredients.length) {
      console.log('passou');
      setCheck(false);
    }
  };
  const onClickFavorite = () => {
    if (meal) {
      const recipe = { id, area, category, name, image };
      return handleClickFavorite(recipe, meal);
    }
    const recipe = { id, category, alcoholic, name, image };
    handleClickFavorite(recipe);
  };
  return (
    <div>
      { copied && 'Link copiado!' }

      <img src={ image } width="150" alt="meal" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{name}</h1>
      <h3 data-testid="recipe-category">
        {meal ? category : alcoholic}
      </h3>

      <div>
        <button type="button" data-testid="share-btn" onClick={ handleClickShare }>
          <img src={ shareIcon } alt="share icon" />
        </button>

        <button
          type="button"
          onClick={ onClickFavorite }
        >
          <img
            src={ favorite ? blackHeartIcon : whiteHeartIcon }
            alt="favorite icon"
            data-testid="favorite-btn"
          />
        </button>
      </div>

      <h2>Ingredients</h2>
      <div>
        {
          ingredients.map((ing, index) => (
            <div
              data-testid={ `${index}-ingredient-step` }
              key={ `${ing}-${index}` }
            >
              <input
                onChange={ (event) => {
                  funcsRecipes.streakIngredient(`${ing}-${index}`, event);
                  verifyCheckbox();
                } }
                data-testid="ingredient-search-radio"
                type="checkbox"
                value={ ing }
                name={ ing }

              />
              {' '}
              <p id={ `${ing}-${index}` }>{ing}</p>
            </div>
          ))
        }
      </div>

      <h2>Instructions</h2>
      <p data-testid="instructions">{instructions}</p>

      <button
        disabled={ check }
        className="finish-button"
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ () => {
          handleClickStartRecipe(id, ingredients, meal ? 'meal' : 'drink');
          return meal
            ? navigate.push('/receitas-feitas')
            : navigate.push('/receitas-feitas');
        } }
      >
        {inProgress ? btnvalue : btnvalue}
      </button>
    </div>
  );
};

// Recipe.defaultProps = { alcoholic: null };

RecipeToProgress.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired,
  alcoholic: PropTypes.string.isRequired,
  meal: PropTypes.bool.isRequired,
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

export default RecipeToProgress;
