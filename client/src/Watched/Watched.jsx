import React, { useContext } from 'react';
import { WatchedContext } from '../Context/WatchedContext';
import './Watched.css';

function Watched() {
  const { watchedMovies } = useContext(WatchedContext);

  return (
    <div>
      <h2>Watched Movies</h2>
      {watchedMovies.length > 0 ? (
        watchedMovies.map((watched) => (
          <p key={watched.id}>{watched.title}</p>
        ))
      ) : (
        <p>No movies watched yet.</p>
      )}
    </div>
  );
}

export default Watched;