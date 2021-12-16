import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import IngredientList from '../components/IngredientList';
import { getAllIngredientsFromRecipe, requestRecipeDetailsById } from '../services';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function FoodRecipeProcess({ location, match: { params: { id } } }) {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [copyed, setCopy] = useState(false);

  useEffect(() => {
    const getRecipe = async () => {
      const recipe = await requestRecipeDetailsById(id, 'comidas');
      setIngredients(getAllIngredientsFromRecipe(recipe));
      setRecipeDetails(recipe);
    };
    getRecipe();
  }, [id]);

  const handleShare = () => {
    copy(`http://localhost:3000${location.pathname}`);
    setCopy(true);
  };

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipeDetails.strMealThumb }
        alt="Recipe"
      />
      <h3 data-testid="recipe-title">{recipeDetails.strMeal}</h3>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShare }
      >
        <img src={ shareIcon } alt="share-icon" />
      </button>
      { copyed && <p>Link copiado!</p> }
      <button type="button" data-testid="favorite-btn">Favorite</button>
      <h4 data-testid="recipe-category">{recipeDetails.strCategory}</h4>
      <IngredientList ingredients={ ingredients } progress id={ id } />
      <p data-testid="instructions">{recipeDetails.strInstructions}</p>
      <p data-testid="video">Video</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        className="start-btn"
      >
        Finalizar receita
      </button>
    </div>
  );
}

FoodRecipeProcess.propTypes = {
  match: PropTypes.objectOf({
    params: PropTypes.number,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};
