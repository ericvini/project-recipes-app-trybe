import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import meals from '../../services/meals-api';
import CardMeals from '../CardMeals/CardMeals';

import Context from '../../Context';

function SearchBarByFood() {
  const { searchData } = useContext(Context);
  const [meal, setMeal] = useState('');
  const [radio, setRadio] = useState('');
  const history = useHistory();
  const firstLetter = 'Primeira letra';
  const maxCard = 16;
  function searchByFood(event) {
    if (event.target.value === 'Ingredientes') {
      setRadio('Ingredientes');
    } else if (event.target.value === 'Nome') {
      setRadio('Nome');
    } else {
      setRadio(firstLetter);
    }
  }
  function verifyIsNull(response) {
    if (response === 'undefined' || response === 'null') {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }
  function verifyIsEqual1(response) {
    if (response.length === 1) {
      const id = Object.entries(response)[0][1].idMeal;
      return history.push(`/comidas/${id}`);
    }
  }

  async function handlerClick() {
    if (radio === 'Ingredientes') {
      const response = await meals.searchMealsByIngredient(searchData, maxCard);
      verifyIsNull(response);
      verifyIsEqual1(response);
      setMeal(response);
    }
    if (radio === 'Nome') {
      const response = await meals.searchMealsByName(searchData, maxCard);
      verifyIsNull(response);
      verifyIsEqual1(response);
      setMeal(response);
    }
    if (radio === firstLetter && searchData.length === 1) {
      const response = await meals.searchMealsByFirstLetter(searchData, maxCard);
      verifyIsNull(response);
      verifyIsEqual1(response);
      setMeal(response);
    }
    if (radio === 'Primeira letra' && searchData.length !== 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  }

  return (
    <div>
      <div onChange={ (event) => searchByFood(event) }>
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          value="Ingredientes"
          name="foods"
        />
        {' '}
        Ingredientes
        <input
          data-testid="name-search-radio"
          type="radio"
          value="Nome"
          name="foods"
        />
        {' '}
        Nome
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          value="Primeira letra"
          name="foods"
        />
        {' '}
        Primeira letra
      </div>
      <div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handlerClick }
        >
          Buscar
        </button>
      </div>
      <div>
        { Object.entries(meal).map((item, index) => (

          <CardMeals
            data-testid={ `${index}-recipe-card` }
            key={ index }
            index={ index }
            item={ item[1] }
          />
        ))}
      </div>
    </div>

  );
}

export default SearchBarByFood;
