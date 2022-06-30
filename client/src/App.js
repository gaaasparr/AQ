import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';

import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';

function App() {
	return (
		<BrowserRouter>
			<div className='App'>
				<Routes>
					<Route exact path='/' element={<Login />} />
					<Route exact path='/cart' element={<Cart />} />
					<Route exact path='/home' element={<Home />} />
					<Route exact path='/:id' element={<ProductDetail />} />
					{/*:id es un parametro que se puede usar en la url, dentro del objeto match */}
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
