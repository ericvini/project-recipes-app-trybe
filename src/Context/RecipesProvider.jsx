import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './index';
import useLocalStorage from '../Hooks/useLocalStorage';
import Meals from '../services/meals-api';
import Drinks from '../services/cocktails-api';

function RecipesProvider({ children }) {
  const [mealsData, setMealsData] = useState([]);
  const [mealsFilteredData, setMealsFilteredData] = useState([]);
  const [mealsCategoryList, setMealsCategoryList] = useState([]);
  const [currentFilterMealsCategory, setCurrentFilterMealsCategory] = useState('All');

  const [drinksData, setDrinksData] = useState([]);
  const [drinksFilteredData, setDrinksFilteredData] = useState([]);
  const [drinksCategoryList, setDrinksCategoryList] = useState([]);
  const [currentFilterDrinksCategory, setCurrentFilterDrinksCategory] = useState('All');

  const [
    inProgressRecipes,
    setInProgressRecipes,
    favoriteRecipes,
    setFavoriteRecipes,
    doneRecipes,
  ] = useLocalStorage();

  const [filteredDoneRecipes, setFilteredDoneRecipes] = useState([]);
  const [filteredFavoriteRecipes, setFilteredFavoriteRecipes] = useState([]);

  const [searchData, setSearchData] = useState('');
  const [isSearchBarActive, setIsSearchBarActive] = useState(false);

  useEffect(() => { setMealsFilteredData(mealsData); }, [mealsData]);
  useEffect(() => { setDrinksFilteredData(drinksData); }, [drinksData]);
  useEffect(() => { setFilteredDoneRecipes(doneRecipes); }, [doneRecipes]);
  useEffect(() => { setFilteredFavoriteRecipes(favoriteRecipes); }, [favoriteRecipes]);

  const checkFavorite = (id) => {
    const foundRecipe = favoriteRecipes.find((recipe) => recipe.id === id);

    if (foundRecipe) {
      return true;
    }
    return false;
  };

  const handleClickCategoryMeals = async (category) => {
    const mealsAmountToShow = 12;

    if (category === 'All') {
      setMealsFilteredData(mealsData);
      return setCurrentFilterMealsCategory('All');
    }

    if (currentFilterMealsCategory !== category) {
      const meals = await Meals.searchMealsByCategory(category, mealsAmountToShow);
      setMealsFilteredData(meals);
      return setCurrentFilterMealsCategory(category);
    }
    setMealsFilteredData(mealsData);
    setCurrentFilterMealsCategory('All');
  };

  const handleClickCategoryDrinks = async (category) => {
    const mealsAmountToShow = 12;

    if (category === 'All') {
      setDrinksFilteredData(drinksData);
      return setCurrentFilterDrinksCategory('All');
    }

    if (currentFilterDrinksCategory !== category) {
      const drinks = await Drinks.searchCocktailsByCategory(category, mealsAmountToShow);
      setDrinksFilteredData(drinks);
      return setCurrentFilterDrinksCategory(category);
    }
    setDrinksFilteredData(drinksData);
    setCurrentFilterDrinksCategory('All');
  };

  const verifyInProgress = (id, isMeal) => {
    const key = isMeal ? 'meals' : 'cocktails';

    if (inProgressRecipes[key]) {
      const isInProgress = inProgressRecipes[key][id];
      if (isInProgress) return true;
    }
    return false;
  };

  const handleClickFavorite = (recipe, isMeal) => {
    if (isMeal) {
      const { id, area, category, name, image } = recipe;

      const alreadyFavorite = checkFavorite(id);

      if (alreadyFavorite) {
        const newFilteredFavoriteRecipes = favoriteRecipes.filter((rec) => rec.id !== id);
        return setFavoriteRecipes(newFilteredFavoriteRecipes);
      }
      const newFavorite = {
        id, area, category, name, image, alcoholicOrNot: '', type: 'comida',
      };

      return setFavoriteRecipes((state) => [...state, newFavorite]);
    }

    const { id, category, alcoholic, name, image } = recipe;

    const alreadyFavorite = checkFavorite(id);

    if (alreadyFavorite) {
      const newFilteredFavoriteRecipes = favoriteRecipes.filter((rec) => rec.id !== id);
      return setFavoriteRecipes(newFilteredFavoriteRecipes);
    }

    const newFavorite = {
      id, category, alcoholicOrNot: alcoholic, name, image, area: '', type: 'bebida',
    };
    setFavoriteRecipes((state) => [...state, newFavorite]);
  };

  const handleClickStartRecipe = (id, ingredients, page) => {
    const key = page === 'meal' ? 'meals' : 'cocktails';

    const isInProgress = verifyInProgress(id, page);
    if (!isInProgress) {
      setInProgressRecipes((state) => ({
        ...state, [key]: { ...state[key], [id]: ingredients },
      }));
    }
  };

  const handleClickFilterRecipesMade = (filter) => {
    if (!filter) return setFilteredDoneRecipes(doneRecipes);

    const newFilteredRecipes = filteredDoneRecipes.filter(({ type }) => type === filter);
    setFilteredDoneRecipes(newFilteredRecipes);
  };

  const handleClickFilterFavoriteRecipes = (filter) => {
    if (!filter) return setFilteredFavoriteRecipes(favoriteRecipes);

    const newFilteredRecipes = filteredFavoriteRecipes
      .filter(({ type }) => type === filter);

    setFilteredFavoriteRecipes(newFilteredRecipes);
  };

  const states = {
    filteredFavoriteRecipes,
    handleClickFilterFavoriteRecipes,
    filteredDoneRecipes,
    handleClickFilterRecipesMade,
    checkFavorite,
    handleClickFavorite,
    verifyInProgress,
    handleClickStartRecipe,
    // email: '',
    meal: {
      mealsData,
      setMealsData,
      mealsCategoryList,
      setMealsCategoryList,
      mealsFilteredData,
      setMealsFilteredData,
      handleClickCategoryMeals,
    },
    drink: {
      drinksData,
      setDrinksData,
      drinksCategoryList,
      setDrinksCategoryList,
      drinksFilteredData,
      setDrinksFilteredData,
      handleClickCategoryDrinks,
    },
    isSearchBarActive,
    setIsSearchBarActive,
    searchData,
    setSearchData,
  };

  return (
    <RecipesContext.Provider value={ states }>
      {children}
    </RecipesContext.Provider>
  );
}

export default RecipesProvider;

RecipesProvider.propTypes = { children: PropTypes.element.isRequired };
