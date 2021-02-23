const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		productsInSale = products.filter(product => product.category == "in-sale")
	    productsVisited = products.filter(product => product.category == "visited")
		res.render('index', {productsInSale, toThousand});
	},
	search: (req, res) => {
		let data = [...products]
		
		data = data.filter(function(product) {

        return product.name == req.query.keywords
		
		})
		console.log(data)
		res.render('results', {data, toThousand})
	},
};

module.exports = controller;
