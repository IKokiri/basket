const express = require('express')
const app = express()
const routes = require('./src/routes');
require('dotenv').config()

const port = process.env.PORT

app.use('/',routes);


app.listen(port, () => {
  console.log(`${port}`)
})