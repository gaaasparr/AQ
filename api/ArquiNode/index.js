const express = require('express');
const app = express();
const axios = require('axios');

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);

	next();
});

const getInfoAPI = async () => {
	let productos = [];
	let page = [1016, 1017, 1039, 1040,1042, 1045, 1047, 1049, 1051, 1052, 1053, 1054];

	for (let i = 0; i <= page.length; i++) {
		if (productos.length > 300) {
			break;
		}
		const apiUrl = await axios.get(
			`https://api.mercadolibre.com/sites/MLA/search?category=MLA${page[i]}`
		);
		const listOf300 = await apiUrl.data.results;
		productos = productos.concat(listOf300);

		console.log('productos cargados: ' + productos.length);
	}

	productos = productos.slice(0, 300);

	console.log('productos cargados: ' + productos.length);

	const productosFormat = productos.map((e) => {
		return {
			id: e.id,
			title: e.title,
			price: e.price,
			thumbnail: e.thumbnail,
			currency_id: e.currency_id,
			available_quantity: e.available_quantity,
			condition: e.condition,
			accepts_mercadopago: e.accepts_mercadopago,
		};
	});
	return productosFormat;
};


app.get('/users', async (request, response) => {
	try {
		let users=[
			{
			id: 1,
			username: 'gaspar',
			password: '827ccb0eea8a706c4c34a16891f84e7b'
			},
			{
			id: 2,
			username: 'brow',
			password: '1111'
			},
		]
		response.send(users)
		
	} catch (error) {
		console.log(error);
	}
});

app.get('/', async (request, response) => {
	try {
		const api = await getInfoAPI();
		response.send(api);
	} catch (error) {
		console.log(error);
	}
});

app.get('/productos', async (request, response) => {
	const title = request.query.title;
	try {
		const productos = await getInfoAPI();
		if (title) {
			const productosTitle = productos.filter((producto) =>
				producto.title.toLowerCase().includes(title.toLowerCase())
			);
			productosTitle.length
				? response.status(200).send(productosTitle)
				: response.status(404).send('No se encontro nada');
		} else {
			response.status(200).send(productos);
		}
	} catch (error) {
		console.log(error);
	}
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
