import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

// import Context from '../../Context';

const Profile = () => {
  const history = useHistory();
  const [emailUser, setEmailUser] = useState({});

  useEffect(() => {
    const userRecover = localStorage.getItem('user');
    const user = userRecover === null ? '{ "email": "not user" }' : userRecover;
    setEmailUser(JSON.parse(user));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <h1 data-testid="profile-email">{emailUser.email}</h1>

      <div>
        <Link to="/receitas-feitas" data-testid="profile-done-btn">
          Receitas Feitas
        </Link>

        <Link to="/receitas-favoritas" data-testid="profile-favorite-btn">
          Receitas Favoritas
        </Link>

        <button type="button" data-testid="profile-logout-btn" onClick={ handleLogout }>
          Sair
        </button>
      </div>
    </div>
  );
};

export default Profile;
