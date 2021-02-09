import React from 'react';

import HeaderNoSearch from '../../components/Header/HeaderNoSearch';
import ExploreFoodButtons from '../../components/ExploreFoodButtons';
import Footer from '../../components/Footer';

function ExploreFoodPage() {
  return (
    <div>
      <HeaderNoSearch title="Explorar Comidas" />
      <ExploreFoodButtons meal />
      <Footer />
    </div>
  );
}

export default ExploreFoodPage;
