import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';
import RecipesProvider from './Context/RecipesProvider';

function App() {
  return (
    <div>

      <RecipesProvider>
        <Routes />
      </RecipesProvider>

    </div>

  );
}

export default App;
