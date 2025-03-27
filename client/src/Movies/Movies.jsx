import './Movies.css';
import { useState, useEffect } from 'react';

function Movies() {
const [movies, setMovies] = useState([]);
const [searchQuery, setSearchQuery] = useState('');

useEffect(() => {
  fetch('http://localhost:3001/movies')
  .then((res) => res.json())
  .then((data) => {
    setMovies(data);
  })
  .catch((error) => {
    console.error('Error fetching movies:', error);
  });
}, [])

const filteredMovies = movies.filter((movie) =>
  movie.title.toLowerCase().includes(searchQuery.toLowerCase())
);


return (
  <>
  <h2>Go ahead and search for the movies since there's so many...</h2>
  <input
        type="text"
        placeholder="Search Movies"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />
    {filteredMovies.length > 0 ? (
    filteredMovies.map((movie) => (
      <div key={movie.id} className="movie">
        <p>{movie.title}</p>
    </div>
    ))
  ) : (
    <p>No movies found.</p>
  )}
  </>
  )
}
export default Movies;