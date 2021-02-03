const express = require('express')
const app = express()
const routes = require('./src/routes');
require('dotenv').config()
app.use(express.json())

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  });

const port = process.env.PORT

app.use('/',routes);

app.listen(port, () => {})