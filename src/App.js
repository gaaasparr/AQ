import React from 'react';
import { Link, Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './components/Home';

function App() {
	return (
		<BrowserRouter>
			<div className='App'>
				<Routes>
					<Route exact path='/' element={<Login />} />
					<Route exact path='/home' element={<Home />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
