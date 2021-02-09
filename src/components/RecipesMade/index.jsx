import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';

import './style.css';

import Context from '../../Context';
import shareIcon from '../../images/shareIcon.svg';

const RecipesMade = () => {
  const { filteredDoneRecipes, handleClickFilterRecipesMade } = useContext(Context);
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
          onClick={ () => handleClickFilterRecipesMade() }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => handleClickFilterRecipesMade('comida') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleClickFilterRecipesMade('bebida') }
        >
          Drinks
        </button>
      </div>

      <div>
        { copied && 'Link copiado!' }
        {
          filteredDoneRecipes.map(({
            id, type, area, category, alcoholicOrNot, name, image, doneDate, tags,
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

                <button type="button" onClick={ () => handleClickShare(id) }>
                  <img
                    src={ shareIcon }
                    alt="share icon"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>

                <Link to={ type === 'comida' ? `/comidas/${id}` : `/bebidas/${id}` }>
                  <h1 data-testid={ `${index}-horizontal-name` }>{name}</h1>
                </Link>

                <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>

                {
                  tags.map((tag, i) => (
                    <button
                      key={ `${i}-tag` }
                      type="button"
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                    >
                      {tag}
                    </button>
                  ))
                }
              </main>
            </article>
          ))
        }
      </div>
    </div>
  );
};

export default RecipesMade;
