import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import FoodPage from './pages/FoodPage';
import DrinkPage from './pages/DrinkPage';
import DetailFoodPage from './pages/DetailFoodPage';
import DetailDrinkPage from './pages/DetailDrinkPage';
import ProcessFoodPage from './pages/ProcessFoodPage';
import ProcessDrinkPage from './pages/ProcessDrinkPage';
import ExplorePage from './pages/ExplorePage';
import ExploreFoodPage from './pages/ExploreFoodPage';
import ExploreDrinkPage from './pages/ExploreDrinkPage';
import ExploreFoodByIngredients from './pages/ExploreFoodByIngredients';
import ExploreDrinkByIngredients from './pages/ExploreDrinkByIngredients';
import ExploreFoodByArea from './pages/ExploreFoodByArea';
import ProfilePage from './pages/ProfilePage';
import RecipesMadePage from './pages/RecipesMadePage';
import RecipesFavoritesPage from './pages/RecipesFavoritesPage';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ LoginPage } />
        <Route path="/comidas/:id/in-progress" component={ ProcessFoodPage } />
        <Route path="/comidas/:id" component={ DetailFoodPage } />
        <Route path="/comidas" component={ FoodPage } />
        <Route path="/bebidas/:id/in-progress" component={ ProcessDrinkPage } />
        <Route path="/bebidas/:id" component={ DetailDrinkPage } />
        <Route path="/bebidas" component={ DrinkPage } />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ ExploreFoodByIngredients }
        />
        <Route path="/explorar/comidas/area" component={ ExploreFoodByArea } />
        <Route path="/explorar/bebidas/area">
          <h1>Not Found</h1>
        </Route>
        <Route path="/explorar/comidas" component={ ExploreFoodPage } />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ ExploreDrinkByIngredients }
        />
        <Route path="/explorar/bebidas" component={ ExploreDrinkPage } />
        <Route path="/explorar" component={ ExplorePage } />
        <Route path="/perfil" component={ ProfilePage } />
        <Route path="/receitas-feitas" component={ RecipesMadePage } />
        <Route path="/receitas-favoritas" component={ RecipesFavoritesPage } />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
