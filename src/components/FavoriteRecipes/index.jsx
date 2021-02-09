import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';

import './style.css';

import Context from '../../Context';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

const FavoriteRecipes = () => {
  const {
    filteredFavoriteRecipes, handleClickFilterFavoriteRecipes, handleClickFavorite,
  } = useContext(Context);
  const [copied, setCopied] = useState(false);

  const handleClickShare = (id) => {
    copy(`${window.location.origin}/comidas/${id}`)
      .then(() => setCopied(true))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => handleClickFilterFavoriteRecipes() }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => handleClickFilterFavoriteRecipes('comida') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleClickFilterFavoriteRecipes('bebida') }
        >
          Drinks
        </button>
      </div>

      <div>
        { copied && 'Link copiado!' }
        {
          filteredFavoriteRecipes.map(({
            id, type, area, category, alcoholicOrNot, name, image,
          }, index) => (
            <article className="recipe-made-card" key={ id }>
              <Link to={ type === 'comida' ? `/comidas/${id}` : `/bebidas/${id}` }>
                <img
                  src={ image }
                  width="200"
                  alt="done recipe"
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>

              <main>
                {
                  type === 'comida'
                    ? (
                      <h2 data-testid={ `${index}-horizontal-top-text` }>
                        {`${area} - ${category}`}
                      </h2>
                    ) : (
                      <h2 data-testid={ `${index}-horizontal-top-text` }>
                        {alcoholicOrNot}
                      </h2>
                    )
                }

                <Link to={ type === 'comida' ? `/comidas/${id}` : `/bebidas/${id}` }>
                  <h1 data-testid={ `${index}-horizontal-name` }>{name}</h1>
                </Link>

                <button type="button" onClick={ () => handleClickShare(id) }>
                  <img
                    src={ shareIcon }
                    alt="share icon"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>

                <button
                  type="button"
                  onClick={ type === 'comida'
                    ? () => handleClickFavorite({
                      id,
                      area,
                      category,
                      name,
                      image,
                    }, true)
                    : () => handleClickFavorite({
                      id,
                      category,
                      alcoholicOrNot,
                      name,
                      image,
                    }, false) }
                >
                  <img
                    src={ blackHeartIcon }
                    alt="favorite icon"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                  />
                </button>
              </main>
            </article>
          ))
        }
      </div>
    </div>
  );
};

export default FavoriteRecipes;
