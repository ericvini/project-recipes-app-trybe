import { useContext, useEffect } from 'react';

import Context from '../Context';
import Meals from '../services/meals-api';
import Drinks from '../services/cocktails-api';

const errorHandler = (err) => console.log(err);

const useLoadApiData = (meals) => {
  const {
    meal: { setMealsData, setMealsCategoryList },
    drink: { setDrinksData, setDrinksCategoryList },
  } = useContext(Context);

  useEffect(() => {
    const amountToShow = 12;

    const urlParams = new URLSearchParams(window.location.search);
    const ing = urlParams.get('ing');

    if (meals && ing) {
      Meals.searchMealsByIngredient(ing, amountToShow)
        .then((res) => setMealsData(res))
        .catch(errorHandler);
    }

    if (!meals && ing) {
      Drinks.searchCocktailsByIngredient(ing, amountToShow)
        .then((res) => setDrinksData(res))
        .catch(errorHandler);
    }

    if (meals && !ing) {
      Meals.getMeals(amountToShow)
        .then((res) => setMealsData(res))
        .catch(errorHandler);
    }

    if (!meals && !ing) {
      Drinks.getCocktails(amountToShow)
        .then((res) => setDrinksData(res))
        .catch(errorHandler);
    }
  }, [meals, setMealsData, setDrinksData]);

  useEffect(() => {
    const categoriesAmountToShow = 5;

    if (meals) {
      Meals.getMealCategoryList(categoriesAmountToShow)
        .then((res) => setMealsCategoryList(res))
        .catch(errorHandler);
    }

    if (!meals) {
      Drinks.getCocktailCategoryList(categoriesAmountToShow)
        .then((res) => setDrinksCategoryList(res))
        .catch(errorHandler);
    }
  }, [meals, setMealsCategoryList, setDrinksCategoryList]);
};
export default useLoadApiData;
