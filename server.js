const { constants } = require("buffer");
const express = require("express");
const path = require('path'); //a node native module

const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const {Item, Restaurant, Menu} = require('./models/index');

const app = express();
const port = 3000;

// Add this boilerplate middleware to successfully use req.body
app.use(express.json())

//Q: What does express.static help us do?
//Q: What do you think path.join helps us do?
app.use(express.static(path.join(__dirname, 'public')))

//Configures handlebars library to work well w/ Express + Sequelize model
const handlebars = expressHandlebars({
    handlebars : allowInsecurePrototypeAccess(Handlebars)
})

//Tell this express app we're using handlebars
app.engine('handlebars', handlebars);
app.set('view engine', 'handlebars')

// serve static assets from the public/ folder
app.use(express.static('public'));

//will add routes
app.get('/items', async (req, res) => {
    //goes into the database and looks for all Items
    const allItems = await Item.findAll()
    //server will respond with all the items found in the database
    res.json(allItems)
})

//get all restaurants
app.get('/restaurants', async (req, res) => {
    const restaurants = await Restaurant.findAll()
    res.render('restaurants', { restaurants })
})

//get restaurant by id
app.get('/restaurants/:id', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    res.render('restaurant', { restaurant })
})

// Add new restaurant
app.post('/restaurants', async (req, res) => {
	let newRestaurant = await Restaurant.create(req.body);
	res.send('Created!')
})

// Delete a restaurant
app.delete('/restaurants/:id', async (req, res) => {
	await Restaurant.destroy({
		where : {id : req.params.id} // Destory an Restaurant where this object matches
	})
	res.send("Deleted!!")
})

// Update a restaurant
app.put("/restaurants/:id", async (req, res) => {
	let updated = await Restaurant.update(req.body, {
		where : {id : req.params.id} // Update a restaurant where the id matches, based on req.body
	})
	res.send("Updated!!")
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});