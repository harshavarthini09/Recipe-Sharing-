import React from 'react';

function RecipeList({ recipes, setSelectedRecipe }) {
  return (
    <>
      <h3>Recipes</h3>
      <ul className="list-group">
        {recipes.map(recipe => (
          <li key={recipe.id} className="list-group-item">
            <h5>{recipe.title}</h5>
            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
            <p><strong>Instructions:</strong> {recipe.instructions}</p>
            <button
              className="btn btn-info btn-sm"
              onClick={() => setSelectedRecipe(recipe)}
            >
              Rate This
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default RecipeList;