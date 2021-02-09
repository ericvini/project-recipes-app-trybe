const api = async (endpoint) => {
  const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

  const response = await fetch(`${BASE_URL}${endpoint}`);
  const responseJSON = await response.json();

  return responseJSON;
};

const limitResult = (array, limit) => {
  const startPositionToShow = 0;

  const smallerArray = array.slice(startPositionToShow, limit);
  return smallerArray;
};

const searchMealsByName = async (name, limit) => {
  const response = await api(`/search.php?s=${name}`);
  const { meals } = response;
  if (meals === null) return 'null';
  if (limit) return limitResult(meals, limit);

  return meals;
};

const searchMealsByFirstLetter = async (letter, limit) => {
  const response = await api(`/search.php?f=${letter}`);
  const { meals } = response;
  if (meals === null) return 'null';
  if (limit) return limitResult(meals, limit);

  return meals;
};

const searchMealsByIngredient = async (ingredient, limit) => {
  const response = await api(`/filter.php?i=${ingredient}`);
  const { meals } = response;
  if (meals === null) return 'null';
  if (limit) return limitResult(meals, limit);

  return meals;
};

const searchMealsByCategory = async (category, limit) => {
  const response = await api(`/filter.php?c=${category}`);
  const { meals } = response;

  if (limit) return limitResult(meals, limit);

  return meals;
};

const searchMealsByArea = async (area, limit) => {
  const response = await api(`/filter.php?a=${area}`);
  const { meals } = response;

  if (limit) return limitResult(meals, limit);

  return meals;
};

const getMeals = async (limit) => {
  const response = await api('/search.php?s=');
  const { meals } = response;

  if (limit) return limitResult(meals, limit);

  return meals;
};

const getMealDetailsById = async (id) => {
  const response = await api(`/lookup.php?i=${id}`);
  const mealDetails = response.meals[0];

  return mealDetails;
};

const getRandomMeal = async () => {
  const response = await api('/random.php');
  const randomMeal = response.meals[0];

  return randomMeal;
};

const getMealCategories = async (limit) => {
  const response = await api('/categories.php');
  const { categories } = response;

  if (limit) return limitResult(categories, limit);

  return categories;
};

const getMealCategoryList = async (limit) => {
  const response = await api('/list.php?c=list');
  const { meals: mealCategories } = response;

  if (limit) return limitResult(mealCategories, limit);

  return mealCategories;
};

const getMealIngredientList = async (limit) => {
  const response = await api('/list.php?i=list');
  const { meals: mealIngredients } = response;

  if (limit) return limitResult(mealIngredients, limit);

  return mealIngredients;
};

const getMealAreaList = async (limit) => {
  const response = await api('/list.php?a=list');
  const { meals: mealAreas } = response;

  if (limit) return limitResult(mealAreas, limit);

  return mealAreas;
};

export default {
  searchMealsByName,
  searchMealsByFirstLetter,
  searchMealsByIngredient,
  searchMealsByCategory,
  searchMealsByArea,
  getMeals,
  getMealDetailsById,
  getRandomMeal,
  getMealCategories,
  getMealCategoryList,
  getMealIngredientList,
  getMealAreaList,
};
