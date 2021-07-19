const {sequelize} = require('./db')
const {Restaurant, Menu, Item} = require('./models/index') //Q: WHY import these models from index vs. from each separate model file?

//Q: Why do you think each object inside of the arrays are structured the way that they are?
//Q: What do you think will happen when we 'seed' this file?
const seedRestaurant = [
  {
    name: 'AppleBees',
    location: 'Dallas',
    cuisine: 'American',
    image: '/img/applebees.jpg'
  },
  {
    name: 'Shabro',
    location: 'Dallas',
    cuisine: 'Shabu Shabu',
    image: '/img/shabro.png'
  },
  {
    name: 'Kura Sushi',
    location: 'Houston',
    cuisine: 'Japanese',
    image: '/img/kura.png'
  },
  {
    name: 'Burger King',
    location: 'Dallas',
    cuisine: 'Fast food',
    image: '/img/burgerking.jpg'
  },
  {
    name: 'Burning Rice',
    location: 'Dallas',
    cuisine: 'Korean',
    image: '/img/burningrice.png'
  },
]
const seedMenu = [
  {
    title: 'Breakfast',
    RestaurantId : 1,
  },
  {
    title: 'Lunch',
    RestaurantId : 2,
  },
  {
    title: 'Dinner',
    RestaurantId : 3,
  },
  {
  title: 'Lunch',
  RestaurantId : 4,
  },
  {
title: 'Dinner',
RestaurantId : 5,
  }
]

const seedItem = [
  {
    name: 'Eggs & Bacon',
    image: 'someimage.jpg',
    price: 9.50,
    vegetarian: false,
    MenuId : 1,
  },
  {
    name: 'Shabu Shabu Buffet',
    image: 'someimage.jpg',
    price: 19.99,
    vegetarian: false,
    MenuId : 2,
  },
  {
    name: 'sushi 2pcs',
    image: 'someimage.jpg',
    price: 2.50,
    vegetarian: false,
    MenuId : 3,
  },
  {
    name: 'Impossible Whopper Meal',
    image: 'someimage.jpg',
    price: 8.99,
    vegetarian: true,
    MenuId : 4,
  },
  {
    name: 'Tofu bibimbap',
    image: 'someimage.jpg',
    price: 9.99,
    vegetarian: true,
    MenuId : 5,
  }
]

//Q: Try to decifer the following function.
//Q: Why are we using async and await?
const seed = async () => {
  try {
    await sequelize.sync({force: true})
    await Restaurant.bulkCreate(seedRestaurant, {validate: true})
    await Menu.bulkCreate(seedMenu, {validate: true})
    await Item.bulkCreate(seedItem, {validate: true}) 
    console.log('Seeding success!')
    sequelize.close()
  } catch (error) {
    console.log('SOMETHING WENT WRONG WITH THE SEEDING: ', error)
  }
}

//Q: What is seed() returning?
seed()
    .then(() => {
      console.log('Seeding success!')
    })
    .catch(err => {
      console.error('Oh noes! Something went wrong!')
      console.error(err)
    })

