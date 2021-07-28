const express = require('express');
const genres = require('./routes/genres');
const app = express();
const mongoose = require("mongoose");
const customers = require("./routes/customer");

mongoose.connect("mongodb://localhost/vidly", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, )
    .then(() =>
        console.log('Connected to database successfully...'))
    .catch((err) =>
        console.log('Error connecting to database', err));

app.use(express.json()); 
app.use('/api/genres', genres); 
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));











// const express = require('express');
// const debug = require('debug')('app:startup');
// const helmet = require('helmet');
// const config = require('config');
// const morgan = require('morgan');
// const genres = require('./routes/genres');
// const home = require('./routes/home');
// const logger = require('./middleware/logger.js');
// const Joi = require('joi');
// const app = express();
// const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost/vidly", {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }, )
//     .then(() =>
//         console.log('Connected to database successfully...'))
//     .catch((err) =>
//         console.log('Error connecting to database', err));

// app.set('view engine', 'pug');
// app.set('views','./views'); //default settings 

// app.use(express.json()); 
// app.use(express.urlencoded({extended: true})); 
// app.use(express.static('public')); 
// app.use(helmet()); 
// app.use(logger);
// app.use('/', home);
// app.use('/api/courses', courses); 

// //Configuration
// console.log(`Application Name: ${config.get('name')}`);
// console.log(`Mail Server Name: ${config.get('mail.host')}`);
// console.log(`App Password: ${config.get('mail.password')}`);

// if(app.get('env') === 'development'){
//     app.use(morgan('combined')); 
//     debug('Debugging enabled bitch...');
// }

// var port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Listening on port ${port} ...`));