import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import UploadForm from './components/UploadForm';
import RecipeList from './components/RecipeList';
import RatingForm from './components/RatingForm';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [rating, setRating] = useState(1);

  // Fetch all recipes on load or refresh
  const refreshRecipes = () => {
    fetch('http://localhost:5000/recipes')
      .then(res => res.json())
      .then(data => setRecipes(data));
  };

  useEffect(() => {
    refreshRecipes();
  }, []);

  // Search recipes
  const handleSearch = () => {
    fetch(`http://localhost:5000/recipes/search?term=${searchTerm}`)
      .then(res => res.json())
      .then(data => setRecipes(data));
  };

  // Add rating
  const handleRate = () => {
    if (!selectedRecipe) return;
    fetch('http://localhost:5000/ratings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipe_id: selectedRecipe.id, rating })
    }).then(() => {
      alert('Rating added!');
      setSelectedRecipe(null);  // Reset selection
    });
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Recipe Sharing Platform</h1>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />

      <UploadForm
        title={title}
        setTitle={setTitle}
        ingredients={ingredients}
        setIngredients={setIngredients}
        instructions={instructions}
        setInstructions={setInstructions}
        refreshRecipes={refreshRecipes}
      />

      <RecipeList recipes={recipes} setSelectedRecipe={setSelectedRecipe} />

      <RatingForm
        selectedRecipe={selectedRecipe}
        rating={rating}
        setRating={setRating}
        handleRate={handleRate}
      />
    </div>
  );
}

export default App;