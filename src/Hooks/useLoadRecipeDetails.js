import { useState, useEffect, useContext } from 'react';

import Context from '../Context';

import Meals from '../services/meals-api';
import Drinks from '../services/cocktails-api';

const filterFoodKeys = (food) => {
  const objKeys = Object.keys(food);

  const filteredIngredientKeys = objKeys.filter((key) => key.includes('strIngredient'));
  const filteredMeasureKeys = objKeys.filter((key) => key.includes('strMeasure'));

  const ingredientsObj = filteredIngredientKeys.map((key) => food[key]);
  const measuresObj = filteredMeasureKeys.map((key) => food[key]);

  const ingredientsObjFiltered = ingredientsObj.filter((ing) => ing);
  const measuresObjFiltered = measuresObj.filter((ing) => ing);

  return [ingredientsObjFiltered, measuresObjFiltered];
};

const useLoadRecipeDetails = (id, isMeal) => {
  const { verifyInProgress, checkFavorite } = useContext(Context);

  const [meal, setMeal] = useState({});
  const [drink, setDrink] = useState({});
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  const [isFetching, setIsFetching] = useState(true);
  const [inProgress, setInProgress] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const isInProgress = verifyInProgress(id, isMeal);
    if (isInProgress) {
      setInProgress(true);
    }
  }, [verifyInProgress, id, isMeal]);

  useEffect(() => {
    const isFavorite = checkFavorite(id);
    if (isFavorite) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }, [id, checkFavorite]);

  useEffect(() => {
    const limitToShow = 6;

    if (isMeal) {
      Meals.getMealDetailsById(id)
        .then((res) => {
          const [filteredIngredients, filteredMeasures] = filterFoodKeys(res);
          setIngredients(filteredIngredients);
          setMeasures(filteredMeasures);
          setMeal(res);
          setIsFetching(false);
        })
        .catch((err) => console.log(err));

      Drinks.getCocktails(limitToShow)
        .then((res) => setDrinks(res))
        .catch((err) => console.log(err));
    }

    if (!isMeal) {
      Drinks.getCocktailDetailsById(id)
        .then((res) => {
          const [filteredIngredients, filteredMeasures] = filterFoodKeys(res);
          setIngredients(filteredIngredients);
          setMeasures(filteredMeasures);
          setDrink(res);
          setIsFetching(false);
        })
        .catch((err) => console.log(err));

      Meals.getMeals(limitToShow)
        .then((res) => setMeals(res))
        .catch((err) => console.log(err));
    }
  }, [isMeal, id]);

  return [
    meal, drink, meals, drinks, ingredients, measures, isFetching, inProgress, favorite,
  ];
};

export default useLoadRecipeDetails;
