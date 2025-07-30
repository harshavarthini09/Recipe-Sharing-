import React from 'react';

function RatingForm({ selectedRecipe, rating, setRating, handleRate }) {
  if (!selectedRecipe) return null;

  return (
    <div className="mt-3">
      <h5>Rate "{selectedRecipe.title}" (1-5)</h5>
      <select
        className="form-select mb-2"
        value={rating}
        onChange={e => setRating(e.target.value)}
      >
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
      <button className="btn btn-warning" onClick={handleRate}>
        Submit Rating
      </button>
    </div>
  );
}

export default RatingForm;