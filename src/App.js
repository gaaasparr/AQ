import React from 'react';
import { Link, Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';

import ProductDetail from './components/ProductDetail';

function App() {
	return (
			<BrowserRouter>
				<div className='App'>
					<Routes>
						<Route exact path='/' element={<Home />} />
						<Route exact path='/:id' element={<ProductDetail />} />
						<Route exact path='/login' element={<Login />} />
					</Routes>
				</div>
			</BrowserRouter>
		
	);
}

export default App;
