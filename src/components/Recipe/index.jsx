import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import YouTube from 'react-youtube';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';

import Context from '../../Context';
import Recommendation from '../Recommendation';

import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

const getYouTubeVideoId = (url) => {
  if (!url) return 'MAiyzmLhIEw';

  const start = url.split('').findIndex((char) => char === '=');
  const videoId = url.slice(start + 1);

  return videoId;
};

const Recipe = ({
  id, area, image, name, category, instructions, youtube, alcoholic, meal, commonProps,
}) => {
  const navigate = useHistory();
  const { handleClickStartRecipe, handleClickFavorite } = useContext(Context);
  const [copied, setCopied] = useState(false);

  const { favorite, ingredients, measures, inProgress, meals, drinks } = commonProps;

  const handleClickShare = () => {
    copy(window.location.href)
      .then(() => setCopied(true))
      .catch((err) => console.log(err));
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
            <p
              key={ `${ing}-${index}` }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`-${ing} - ${measures[index]}`}
            </p>
          ))
        }
      </div>

      <h2>Instructions</h2>
      <p data-testid="instructions">{instructions}</p>

      <h2 data-testid="video">Video</h2>
      <YouTube
        videoId={ getYouTubeVideoId(youtube) }
        opts={ { height: '240', width: '360' } }
      />

      <Recommendation
        page={ meal ? 'meal' : 'drink' }
        recommendations={ meal ? drinks : meals }
      />

      <button
        className="start-button"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => {
          handleClickStartRecipe(id, ingredients, meal ? 'meal' : 'drink');
          return meal
            ? navigate.push(`/comidas/${id}/in-progress`)
            : navigate.push(`/bebidas/${id}/in-progress`);
        } }
      >
        {inProgress ? 'Continuar Receita' : 'Iniciar Receita'}
      </button>
    </div>
  );
};

// Recipe.defaultProps = { alcoholic: null };

Recipe.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired,
  youtube: PropTypes.string.isRequired,
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

export default Recipe;
