import './Movies.css';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { WatchedContext } from '../Context/WatchedContext.jsx';

function Movies() {
const [movies, setMovies] = useState([]);
const [searchQuery, setSearchQuery] = useState('');
const [newMovie, setNewMovie] = useState('');

const { watchedMovies, setWatchedMovies } = useContext(WatchedContext);

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

const handleWatchedMovie = (movie) => {
  if (watchedMovies.some((watched) => watched.id === movie.id)) {
    setWatchedMovies(watchedMovies.filter((watched) => watched.id !== movie.id));
  } else {
    setWatchedMovies([...watchedMovies, movie]);
  }
}

const handleAddMovie = (e) => {
  e.preventDefault();
  if (!newMovie.trim()) {
    alert('Movie title cannot be empty!');
    return;
  }
  fetch('http://localhost:3001/movies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: newMovie }),
  })
    .then((res) => res.json())
    .then((data) => {
      setMovies([...movies, { id: data.id , title: newMovie }]);
      setNewMovie('');
    })
    .catch((error) => {
      console.error('Error adding movie:', error);
    });
}

const handleDeleteMovie = (id) => {
  fetch(`http://localhost:3001/movies/${id}`, {
    method: 'DELETE',
  })
    .then((res) => {
      if (res.ok) {
        setMovies(movies.filter((movie) => movie.id !== id));
      } else {
        throw new Error('Failed to delete movie');
      }
    })
    .catch((error) => {
      console.error('Error deleting movie:', error);
    });
}

return (
  <>
  <input
        type="text"
        placeholder="Search Movies"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

  <form onSubmit={handleAddMovie}>
    <input
      type="text"
      placeholder="Add a new movie"
      value={newMovie}
      onChange={(e) => setNewMovie(e.target.value)}
      className="add-movie-input"
    />
    <button type="submit" className="add-movie-button">Add Movie</button>
  </form>

    {filteredMovies.length > 0 ? (
    filteredMovies.map((movie) => (
      <div key={movie.id} className="movie-item">
        <p className = "movie-title">{movie.title}</p>
        <button className = "delete-movie-button" onClick={() => handleDeleteMovie(movie.id)}>Delete</button>
        <button className = {`watched-movie-button
          ${watchedMovies.some((watched) => watched.id === movie.id) ? 'watched' : '' }`}
              onClick = {() => handleWatchedMovie(movie)}>
          {watchedMovies.some((watched) => watched.id === movie.id) ? 'Watched' : 'To Watch'}</button>
    </div>
    ))
  ) : (
    <p>No movies found.</p>
  )}
  </>
  )
}
export default Movies;