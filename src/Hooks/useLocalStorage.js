import { useEffect, useState } from 'react';

const getLocalStorageItem = (item) => {
  const itemString = localStorage.getItem(item);
  const itemObj = JSON.parse(itemString);

  return itemObj;
};

const useLocalStorage = () => {
  const [inProgressRecipes, setInProgressRecipes] = useState({});
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);

  const [updatingLocalStorage, setUpdatingLocalStorage] = useState(true);

  useEffect(() => {
    const inProgressItems = getLocalStorageItem('inProgressRecipes');
    if (inProgressItems) setInProgressRecipes(inProgressItems);

    const favoriteItems = getLocalStorageItem('favoriteRecipes');
    if (favoriteItems) setFavoriteRecipes(favoriteItems);

    const doneItems = getLocalStorageItem('doneRecipes');
    if (doneItems) setDoneRecipes(doneItems);

    setUpdatingLocalStorage(false);
  }, []);

  useEffect(() => {
    if (!updatingLocalStorage) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    }
  }, [inProgressRecipes, favoriteRecipes, doneRecipes, updatingLocalStorage]);

  return [
    inProgressRecipes,
    setInProgressRecipes,
    favoriteRecipes,
    setFavoriteRecipes,
    doneRecipes,
  ];
};

export default useLocalStorage;
