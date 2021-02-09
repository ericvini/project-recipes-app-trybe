import React, { useContext } from 'react';

import Header from '../../components/Header/index';
import Grid from '../../components/Grid';
import Footer from '../../components/Footer';
import SearchBarByDrinks from '../../components/SearchBarDrinks/SearchBarByDrinks';

import Context from '../../Context';

function DrinkPage() {
  const { isSearchBarActive } = useContext(Context);

  return (
    <div>
      <Header title="Bebidas" />

      <SearchBarByDrinks />
      {
        !isSearchBarActive && <Grid />
      }
      <Footer />
    </div>
  );
}

export default DrinkPage;
