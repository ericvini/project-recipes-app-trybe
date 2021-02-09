import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.css';

import RecipeContainer from '../RecipeContainer';
import useLoadRecipeDetails from '../../Hooks/useLoadRecipeDetails';
import RecipeProgress from '../RecipeProgress/RecipeProgress';

const RecipeDetails = ({ isMeal, process }) => {
  const { id } = useParams();

  const [
    meal, drink, meals, drinks, ingredients, measures, isFetching, inProgress, favorite,
  ] = useLoadRecipeDetails(id, isMeal);

  if (isFetching) {
    return <h1>Loading details...</h1>;
  }

  const commonProps = {
    isMeal, favorite, ingredients, meals, drinks, measures, inProgress,
  };

  if (process) {
    return (

      <RecipeProgress
        recipe={ isMeal ? meal : drink }
        commonProps={ commonProps }
      />

    );
  }
  return (

    <RecipeContainer
      recipe={ isMeal ? meal : drink }
      commonProps={ commonProps }
    />

  );
};

RecipeDetails.propTypes = {
  isMeal: PropTypes.bool.isRequired,
  process: PropTypes.bool.isRequired };

export default RecipeDetails;
