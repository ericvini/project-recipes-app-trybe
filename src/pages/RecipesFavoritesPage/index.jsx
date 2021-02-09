import React from 'react';

import HeaderNoSearch from '../../components/Header/HeaderNoSearch';
import FavoriteRecipes from '../../components/FavoriteRecipes';

function RecipesFavoritesPages() {
  return (
    <div>
      <HeaderNoSearch title="Receitas Favoritas" />
      <FavoriteRecipes />
    </div>

  );
}

export default RecipesFavoritesPages;
