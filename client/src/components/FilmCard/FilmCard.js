import React from 'react';

function FilmCard({ title, director, poster, releaseYear, language, rating }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
      <img src={poster} alt={title} style={{ width: "150px" }} />
      <h3>{title}</h3>
      <p><strong>Director:</strong> {director}</p>
      <p><strong>Year:</strong> {releaseYear}</p>
      <p><strong>Language:</strong> {language}</p>
      <p><strong>Rating:</strong> {rating}</p>
    </div>
  );
}

export default FilmCard;
