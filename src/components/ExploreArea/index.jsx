import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './style.css';

import Context from '../../Context';
import Meals from '../../services/meals-api';

const ExploreArea = () => {
  const { setMealsData, mealsFilteredData } = useContext(Context).meal;

  const [areaList, setAreaList] = useState([]);
  const [area, setArea] = useState('');

  useEffect(() => {
    const amountToShow = 12;

    Meals.getMeals(amountToShow)
      .then((res) => setMealsData(res))
      .catch((err) => console.log(err));
  }, [setMealsData]);

  useEffect(() => {
    Meals.getMealAreaList()
      .then((res) => setAreaList(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const amountToShow = 12;

    if (area === 'All') {
      Meals.getMeals(amountToShow)
        .then((res) => setMealsData(res))
        .catch((err) => console.log(err));
    } else {
      Meals.searchMealsByArea(area, amountToShow)
        .then((res) => setMealsData(res))
        .catch((err) => console.log(err));
    }
  }, [area, setMealsData]);

  if (!areaList.length) {
    return <h1>Loading meals...</h1>;
  }

  return (
    <>
      <div>
        <select
          name="area"
          id="area"
          data-testid="explore-by-area-dropdown"
          onChange={ (e) => setArea(e.target.value) }
        >
          <option value="All" data-testid="All-option">All</option>
          {
            areaList.map(({ strArea }) => (
              <option
                value={ strArea }
                key={ strArea }
                data-testid={ `${strArea}-option` }
              >
                {strArea}
              </option>
            ))
          }
        </select>

      </div>
      <div className="grid-list">
        {
          mealsFilteredData.map(({ idMeal, strMeal, strMealThumb }, index) => (
            <Link
              to={ `/comidas/${idMeal}` }
              key={ idMeal }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                className="recipe-img"
                width="150"
                src={ strMealThumb }
                alt="meal"
                data-testid={ `${index}-card-img` }
              />
              <h2 data-testid={ `${index}-card-name` }>
                {strMeal}
              </h2>
            </Link>
          ))
        }
      </div>
    </>
  );
};

export default ExploreArea;
