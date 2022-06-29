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
	let page = [
		1016, 1017, 1039, 1040, 1045, 1051, 1018, 1035, 1037, 1038, 1039, 1040,
		1041, 1042, 1043, 1044, 1045, 1046, 1047, 1048, 1049, 1050, 1051, 1052,
		1053, 1054, 1055, 1056, 1057, 1058, 1059, 1060, 1061, 1062, 1063, 1064,
		1065, 1066, 1067, 1068, 1069, 1070, 1071, 1072, 1073, 1074, 1075, 1076,
		1077, 1078, 1079, 1080, 1081, 1082, 1083, 1084, 1085, 1086, 1087, 1088,
		1089, 1090, 1091, 1092, 1093, 1094, 1095, 1096, 1097, 1098, 1099, 1100,
		1101, 1102, 1103, 1104, 1105, 1106, 1107, 1108, 1109, 1110, 1111, 1112,
		1113, 1114, 1115, 1116, 1117, 1118, 1119, 1120, 1121, 1122, 1123, 1124,
		1125, 1126, 1127, 1128, 1129, 1130, 1131, 1132, 1133, 1134, 1135, 1136,
		1137, 1138, 1139, 1140, 1141, 1142, 1143, 1144, 1145, 1146, 1147, 1148,
		1149, 1150, 1151, 1152, 1153, 1154, 1155, 1156, 1157, 1158, 1159, 1160,
		1161, 1162, 1163, 1164, 1165, 1166, 1167, 1168, 1169, 1170, 1171, 1172,
		1173, 1174, 1175, 1176, 1177, 1178, 1179, 1180, 1181, 1182, 1183, 1184,
		1185, 1186, 1187, 1188, 1189, 1190, 1191, 1192, 1193, 1194, 1195, 1196,
		1197, 1198, 1199, 1200, 1201, 1202, 1203, 1204, 1205, 1206, 1207, 12,
	];

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
