const { constants } = require("buffer");
const express = require("express");
const path = require('path'); //a node native module
const {Item, Restaurant, Menu} = require('./models/index');

const app = express();
const port = 3000;

// Add this boilerplate middleware to successfully use req.body
app.use(express.json())

//Q: What does express.static help us do?
//Q: What do you think path.join helps us do?
app.use(express.static(path.join(__dirname, 'public')))

//will add routes
// 1)client makes a request -> request URL -> URL -> http request -> http response

//will add routes
app.get('/items', async (req, res) => {
    //goes into the database and looks for all Items
    const allItems = await Item.findAll()
    //server will respond with all the items found in the database
    res.json(allItems)
})

app.get('/randomItem', async (req, res) => {
    const randomNum = Math.floor(Math.random() * 3)
    const randomItem = await Item.findByPk(randomNum)

    res.json(randomItem)
})

app.get("/flipcoin", (request, response) => {
    const randomNumber = Math.floor(Math.random() * 2);
    if(randomNumber === 1){
        response.send("heads");
    }else{
        response.send("tails");
    }
})

app.get('/restaurants', async (req, res) => {
    const allRestaurants = await Restaurant.findAll();
    res.json(allRestaurants);
})

app.get('/restaurants/:id', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id, {include: Menu});
    const menu  = await Menu.findByPk(req.params.id, {include: Item});
    res.json({ restaurant, menu })
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

//Q: What will our server be doing?
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});