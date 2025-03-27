import "./App.css";
import { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Movies from './Movies/Movies.jsx';
import Watched from './Watched/Watched.jsx';
import { WatchedProvider } from './Context/WatchedContext.jsx';


function App() {

	return (
	<>
	<WatchedProvider>
	<Link to = {'/'}><h1>Ethan's Dope Movies</h1></Link>
		<Link to = {'/movies'}><button>Movies List</button></Link>
		<Link to = {'/watched'}><button>Watched List</button></Link>

		<Routes>
        <Route path='/movies' element={<Movies />} />
				<Route path='/watched' element={<Watched />} />
      </Routes>
	</WatchedProvider>
	</>
	);
}

export default App;
