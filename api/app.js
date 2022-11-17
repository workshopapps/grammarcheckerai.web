require('dotenv').config()
require('./database') // load database
const { urlencoded } = require('express'),
    {cors} = require('./utils/cors'),
    {development} = require("./config/development")
    express = require('express'),
    app = express()



app.use(express.json())
    .use(cors) 
    .use(express.urlencoded({ extended: false }))
    .get('/', (req,res) => res.send('Connected'))
    .listen(development.PORT, () =>  console.log(`App is running on port ${development.PORT}`)) 
