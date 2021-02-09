import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CardDrinks from '../CardDrinks/CardDrinks';
import cocktails from '../../services/cocktails-api';

import Context from '../../Context';

function SearchBarByDrinks() {
  const { searchData } = useContext(Context);
  const [drink, setDrink] = useState('');
  const [radio, setRadio] = useState('');
  const history = useHistory();
  const firstLetter = 'Primeira letra';
  const limite = 12;

  function searchByDrinks(event) {
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
      const id = Object.entries(response)[0][1].idDrink;
      return history.push(`/bebidas/${id}`);
    }
  }
  async function handlerClick() {
    if (radio === 'Ingredientes') {
      const response = await cocktails.searchCocktailsByIngredient(searchData, limite);
      verifyIsNull(response);
      verifyIsEqual1(response);
      setDrink(response);
    }
    if (radio === 'Nome') {
      const response = await cocktails.searchCocktailsByName(searchData, limite);
      verifyIsNull(response);
      verifyIsEqual1(response);
      setDrink(response);
    }
    if (radio === firstLetter && searchData.length === 1) {
      const response = await cocktails.searchCocktailsByFirstLetter(searchData, limite);
      verifyIsNull(response);
      verifyIsEqual1(response);
      setDrink(response);
    }
    if (radio === 'Primeira letra' && searchData.length !== 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  }
  return (
    <div>
      <div onChange={ (event) => searchByDrinks(event) }>
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
        { Object.entries(drink).map((item, index) => (

          <CardDrinks
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

export default SearchBarByDrinks;
