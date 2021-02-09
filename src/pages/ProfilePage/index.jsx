import React from 'react';

import HeaderNoSearch from '../../components/Header/HeaderNoSearch';
import Profile from '../../components/Profile';
import Footer from '../../components/Footer';

function Perfil() {
  return (
    <div>
      <HeaderNoSearch title="Perfil" />
      <Profile />
      <Footer />
    </div>
  );
}

export default Perfil;
