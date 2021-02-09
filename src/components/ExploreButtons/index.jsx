import React from 'react';
import { Link } from 'react-router-dom';

const ExploreButtons = () => (
  <div>
    <Link to="/explorar/comidas" data-testid="explore-food">
      Explorar Comidas
    </Link>

    <Link to="/explorar/bebidas" data-testid="explore-drinks">
      Explorar Bebidas
    </Link>
  </div>
);

export default ExploreButtons;
