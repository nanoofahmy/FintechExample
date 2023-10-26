const express = require('express')
const path = require('path');
const envFilePath = path.resolve(`./config/.env.${process.env.NODE_ENV}`);
console.log('app env file:', envFilePath)
require('dotenv').config({ path: envFilePath });
const bodyParser = require('body-parser')
var morgan = require('morgan')
const router = require('./routes/index');
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000;
const db = require('./models/index');

//DB options
if (!process.env.NODE_ENV.includes('test')) {
  db.sequelize.sync({ alter: true }).then(() => {

    console.log('db connected')
  }).catch((error) => console.log(error));

 
}

app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.json())
app.use(router)
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`server is running  on port ${PORT}`))
module.exports = app