const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
var products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', {products, toThousand});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let idProducto = req.params.id
		const resultado = products.find( product => product.id == idProducto );
		
		res.render('detail', {resultado: resultado, toThousand, title : resultado.name});
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		products.push({
			...req.body,
			id: products[products.length - 1].id + 1,
			img: req.files[0].filename,
		  });
		  products = JSON.stringify(products);
		  fs.writeFileSync(productsFilePath, products);
		res.send("Yay!")
	},

	// Update - Form to edit
	edit: (req, res) => {
		let idProducto = req.params.id
		const resultado = products.find( product => product.id == idProducto );
		res.render('product-edit-form', {resultado});
	},
	// Update - Method to update
	update: (req, res) => {
		let productId = req.params.id

		products.forEach(function(item){
			
			if (product.id == req.params.id){
				product.name = req.body.name
				product.price = req.body.price
				product.description = req.body.description
				product.category = req.body.category
				product.img = req.files[0].filename
			} 
		})
		
		let newContentJSON = JSON.stringify(products)
		
		fs.writeFileSync(productsFilePath, newContentJSON)
		res.redirect("/products")
	},
	

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let productId = req.params.id
		console.log(productId)
		let newContent = products.filter((producto => {return producto.id != productId}))
		newContentJSON = JSON.stringify(newContent)
		fs.writeFileSync(productsFilePath, newContentJSON)
		res.redirect("../../")
	}
	
};

module.exports = controller
