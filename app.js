const express = require('express')
const app = express()
const routes = require('./src/routes');
require('dotenv').config()
app.use(express.json())


const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('basket', 'root', '', {
    dialect: 'mysql',
    dialectOptions: {
      // Your mysql2 options here
    }
  })

const port = process.env.PORT

app.use('/',routes);

app.listen(port, () => {})