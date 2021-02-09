import React, { useContext } from 'react';
import Header from '../../components/Header/index';
import SearchBarFood from '../../components/SearchBarFood/SearchBarFood';
import Grid from '../../components/Grid';
import Footer from '../../components/Footer';

import Context from '../../Context';

function FoodPage() {
  const { isSearchBarActive } = useContext(Context);

  return (
    <div>
      <Header title="Comidas" />

      <SearchBarFood />
      {
        !isSearchBarActive && <Grid isMeal />
      }
      <Footer />
    </div>
  );
}

export default FoodPage;
