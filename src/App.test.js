import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';
import renderWithRouter from './renderWithRouter';

describe('Login Page Tests', () => {
  it('Tests if the Login page, have email and password inputs and a Submit Button', ()=> {
    const { getByTestId } = render(<App />);
    const email = getByTestId('email-input');
    const password = getByTestId('password-input');
    const submit = getByTestId('login-submit-btn');
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
  });

  it('Tests if email input is writable', () => {
    const { getByTestId } = render(<App />);
    fireEvent.change(getByTestId('email-input'), { target: { value: 'aa'} });
    const email = getByTestId('email-input');
    expect(email.value).toBe('aa');
  });

  it('Tests if password input is writable', () => {
    const { getByTestId } = render(<App />);
    fireEvent.change(getByTestId('password-input'), { target: { value: '12'} });
    const email = getByTestId('password-input');
    expect(email.value).toBe('12');
  });

  it('Tests if email and password are up to the specifications', () => {
    const { getByTestId } = render(<App />);
    fireEvent.change(getByTestId('email-input'), { target: { value: 'marcio@marcio.com'} });
    fireEvent.change(getByTestId('password-input'), { target: { value: '12'} });
    const submit = getByTestId('login-submit-btn');
    expect(submit.disabled).toBe(true);
    fireEvent.change(getByTestId('email-input'), { target: { value: 'marcio'} });
    fireEvent.change(getByTestId('password-input'), { target: { value: '123456'} });
    expect(submit.disabled).toBe(true);
    fireEvent.change(getByTestId('email-input'), { target: { value: 'marcio@marcio.com'} });
    fireEvent.change(getByTestId('password-input'), { target: { value: '1234567'} });
    expect(submit.disabled).toBe(false);
  });

  it('Checks if 2 tokens are saved on localStorage on Submit', () => {
    const { getByTestId } = render(<App />);
    fireEvent.change(getByTestId('email-input'), { target: { value: 'marcio@marcio.com'} });
    fireEvent.change(getByTestId('password-input'), { target: { value: '1234567'} });
    localStorage.clear();
    fireEvent.click(getByTestId('login-submit-btn'));
    const cocktailsToken = localStorage.getItem('cocktailsToken');
    const mealsToken = localStorage.getItem('mealsToken');
    expect(cocktailsToken).toBe('');
    expect(mealsToken).toBe('');
  });

  it('Checks if the user email is saved on localStorage as specified', () => {
    const { getByTestId } = render(<App />);
    fireEvent.change(getByTestId('email-input'), { target: { value: 'marcio@marcio.com'} });
    fireEvent.change(getByTestId('password-input'), { target: { value: '1234567'} });
    localStorage.clear();
    fireEvent.click(getByTestId('login-submit-btn'));
    const user = localStorage.getItem('user');
    expect(user).toBe('{"email":"marcio@marcio.com"}');
  });

  it('Tests if after form submition the application is redirected', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    fireEvent.change(getByTestId('email-input'), { target: { value: 'marcio@marcio.com'} });
    fireEvent.change(getByTestId('password-input'), { target: { value: '1234567'} });
    fireEvent.click(getByTestId('login-submit-btn'));
    const path = history.location.pathname;
    expect(path).toBe('/comidas');
  });
});
