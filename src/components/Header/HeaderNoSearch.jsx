import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import profile from '../../images/profileIcon.svg';

import './style.css';

function HeaderNoSearch(props) {
  const { title } = props;
  const [search, setSearch] = useState(false);

  function input() {
    if (!search) {
      setSearch(true);
    } else {
      setSearch(false);
    }
  }

  return (
    <div className="header">

      <button
        type="button"
        onClick={ () => <Redirect to="/perfil" /> }
      >
        <img data-testid="profile-top-btn" src={ profile } alt="profile-icon" />
      </button>

      <h1 data-testid="page-title">{title}</h1>
      <div>
        { search && <input
          type="text"
          data-testid="search-input"
          placeholder="Buscar Receita"
        />}
      </div>
    </div>

  );
}
HeaderNoSearch.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HeaderNoSearch;
