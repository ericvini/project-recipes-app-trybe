import React from 'react';

import HeaderNoSearch from '../../components/Header/HeaderNoSearch';
import Ingredients from '../../components/Ingredients';
import Footer from '../../components/Footer';

function ExploreDrinkByIngredients() {
  return (
    <div>
      <HeaderNoSearch title="Explorar Ingredientes" />
      <Ingredients />
      <Footer />
    </div>
  );
}

export default ExploreDrinkByIngredients;
