const api = async (endpoint) => {
  const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

  const response = await fetch(`${BASE_URL}${endpoint}`);
  const responseJSON = await response.json();

  return responseJSON;
};

const limitResult = (array, limit) => {
  const startPositionToShow = 0;

  const smallerArray = array.slice(startPositionToShow, limit);
  return smallerArray;
};

const searchCocktailsByName = async (name, limit) => {
  const response = await api(`/search.php?s=${name}`);
  const { drinks } = response;
  if (drinks === null) return 'null';
  if (limit) return limitResult(drinks, limit);

  return drinks;
};

const searchCocktailsByFirstLetter = async (letter, limit) => {
  const response = await api(`/search.php?f=${letter}`);
  const { drinks } = response;
  if (drinks === undefined) return 'undefined';
  if (limit) return limitResult(drinks, limit);

  return drinks;
};

const searchCocktailsByIngredient = async (ingredient, limit) => {
  const response = await api(`/filter.php?i=${ingredient}`);
  const { drinks } = response;

  if (drinks === undefined) return 'undefined';
  if (limit) return limitResult(drinks, limit);

  return drinks;
};

const searchCocktailsByCategory = async (category, limit) => {
  const response = await api(`/filter.php?c=${category}`);
  const { drinks } = response;

  if (limit) return limitResult(drinks, limit);

  return drinks;
};

const getCocktailDetailsById = async (id) => {
  const response = await api(`/lookup.php?i=${id}`);
  const drinkDetails = response.drinks[0];

  return drinkDetails;
};

const getCocktails = async (limit) => {
  const response = await api('/search.php?s=');
  const { drinks } = response;

  if (limit) return limitResult(drinks, limit);

  return drinks;
};

const getRandomCocktail = async () => {
  const response = await api('/random.php');
  const randomDrink = response.drinks[0];

  return randomDrink;
};

const getCocktailCategoryList = async (limit) => {
  const response = await api('/list.php?c=list');
  const { drinks: drinkCategories } = response;

  if (limit) return limitResult(drinkCategories, limit);

  return drinkCategories;
};

const getCocktailIngredientList = async (limit) => {
  const response = await api('/list.php?i=list');
  const { drinks: drinkIngredients } = response;

  if (limit) return limitResult(drinkIngredients, limit);

  return drinkIngredients;
};

export default {
  searchCocktailsByName,
  searchCocktailsByFirstLetter,
  searchCocktailsByIngredient,
  searchCocktailsByCategory,
  getCocktailDetailsById,
  getRandomCocktail,
  getCocktailCategoryList,
  getCocktailIngredientList,
  getCocktails,
};
