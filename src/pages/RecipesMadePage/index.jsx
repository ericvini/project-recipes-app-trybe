import React from 'react';

import HeaderNoSearch from '../../components/Header/HeaderNoSearch';
import RecipesMade from '../../components/RecipesMade';

function RecipesMadePage() {
  return (
    <div>
      <HeaderNoSearch title="Receitas Feitas" />
      <RecipesMade />
    </div>

  );
}

export default RecipesMadePage;
