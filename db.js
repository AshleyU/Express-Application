const { Sequelize } = require('sequelize'); //Q: Why is this Sequelize capitalized?
const path = require('path'); //a node native module

//Q: What are we creating down below?
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'db.sqlite'), //quick way to get the path for our db
});

//Q: Why are we exporting lowercase sequelize?
module.exports = {sequelize};
