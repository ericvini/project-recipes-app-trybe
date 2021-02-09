import React from 'react';

import HeaderNoSearch from '../../components/Header/HeaderNoSearch';
import ExploreFoodButtons from '../../components/ExploreFoodButtons';
import Footer from '../../components/Footer';

function ExploreDrinkPage() {
  return (
    <div>
      <HeaderNoSearch title="Explorar Bebidas" />
      <ExploreFoodButtons />
      <Footer />
    </div>
  );
}

export default ExploreDrinkPage;
