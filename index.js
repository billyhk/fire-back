const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors')
const strainsController = require('./controllers/strains')
const mongoose = require('mongoose')


app.use(cors())
app.use(bodyParser.json());

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/strains', strainsController)

app.set('port', process.env.PORT || 4000)

app.listen(4000, () => {
  console.log('FIRE-back listening on 4000. We are connected!')
})
