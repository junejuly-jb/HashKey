const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotevn = require('dotenv')
const cors = require('cors')

const app = express();
const apiRoutes = require('./routes/api')

dotevn.config()

mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => console.log('Connected to Database'))


//Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

//Routes
app.use('/api', apiRoutes)

//Server
const port = process.env.PORT || 5000 
app.listen(port, () => {
    console.log(`app is listening to port: ${port}`)
})