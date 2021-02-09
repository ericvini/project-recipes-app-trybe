import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

const Footer = () => (
  <footer className="footer-bar" data-testid="footer">
    <Link to="/bebidas">
      <img src={ drinkIcon } alt="drink icon" data-testid="drinks-bottom-btn" />
    </Link>
    <Link to="/explorar">
      <img src={ exploreIcon } alt="drink icon" data-testid="explore-bottom-btn" />
    </Link>
    <Link to="/comidas">
      <img src={ mealIcon } alt="drink icon" data-testid="food-bottom-btn" />
    </Link>
  </footer>
);

export default Footer;
