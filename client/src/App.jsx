import "./App.css";
import { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Movies from './Movies/Movies.jsx';


function App() {

	return (
	<>
		<h1>Ethan's Dope Movies</h1>
		<Link to = {'/Movies'}><button>Movies List</button></Link>

		<Routes>
        <Route path='/movies' element={<Movies />} />
      </Routes>
	</>
	);
}

export default App;
