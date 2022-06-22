const express = require('express')
const morgan = require('morgan')
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
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors())

//Routes
app.use('/api', apiRoutes)
app.use(function(req, res) {
    return res.status(404).json({
        success: false,
        status: 404,
        message: 'Route not found'
    })
});

//Server
const port = process.env.PORT || 5000 
app.listen(port, () => {
    console.log(`app is listening to port: ${port}`)
})