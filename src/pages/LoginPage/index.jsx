import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const HandleChange = ({ target }) => {
    if (target.name === 'email') {
      return setEmail(target.value);
    }
    return setPassword(target.value);
  };

  const ValidateFields = () => {
    const re = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    const minLength = 6;
    if (re.test(email) && password.length > minLength) {
      return false;
    }
    return true;
  };

  const CheckLocalStorage = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    const userEmail = email;
    const user = { email: userEmail };
    localStorage.setItem('user', JSON.stringify(user));
  };

  return (
    <div>
      <label htmlFor="email">
        Email:
        <input
          value={ email }
          onChange={ HandleChange }
          required
          name="email"
          type="email"
          data-testid="email-input"
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          value={ password }
          onChange={ HandleChange }
          required
          name="password"
          type="text"
          data-testid="password-input"
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ ValidateFields() }
        onClick={ () => {
          CheckLocalStorage();
          history.push('/comidas');
        } }
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
