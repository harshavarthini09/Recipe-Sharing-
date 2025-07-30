import React from 'react';

function UploadForm({ title, setTitle, ingredients, setIngredients, instructions, setInstructions, refreshRecipes }) {
  const handleUpload = () => {
    fetch('http://localhost:5000/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, ingredients, instructions })
    }).then(() => {
      alert('Recipe uploaded!');
      setTitle('');
      setIngredients('');
      setInstructions('');
      refreshRecipes();  // Refresh the recipe list
    });
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5>Upload a Recipe</h5>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Ingredients"
          value={ingredients}
          onChange={e => setIngredients(e.target.value)}
        ></textarea>
        <textarea
          className="form-control mb-2"
          placeholder="Instructions"
          value={instructions}
          onChange={e => setInstructions(e.target.value)}
        ></textarea>
        <button className="btn btn-success" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
  );
}

export default UploadForm;