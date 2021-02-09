import React from 'react';

import HeaderNoSearch from '../../components/Header/HeaderNoSearch';
import ExploreButtons from '../../components/ExploreButtons';
import Footer from '../../components/Footer';

function ExplorePage() {
  return (
    <div>
      <HeaderNoSearch title="Explorar" />
      <ExploreButtons />
      <Footer />
    </div>
  );
}

export default ExplorePage;
