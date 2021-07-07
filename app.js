const express = require('express');
const helmet = require('helmet');
const config = require('config');
const morgan = require('morgan');
const logger = require('./logger.js');
const Joi = require('joi');
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 
app.use(express.static('public')); 
app.use(helmet()); 
app.use(logger);

// $env:app_password="12345" 

//Configuration
console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server Name: ${config.get('mail.host')}`);
console.log(`App Password: ${config.get('mail.password')}`);

console.log(app.get('env'));

if(app.get('env') === 'development'){
    app.use(morgan('combined')); 
    console.log('Morgan enabled...');
}


const courses = [{
        id: 1,
        name: 'course1'
    },
    {
        id: 2,
        name: 'course2'
    },
    {
        id: 3,
        name: 'course3'
    },
];


//POST REQUEST
app.post('/api/courses', (req, res) => {
    //Input Validation
    const {
        error
    } = validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

//PUT REQUEST
app.put('/api/courses/:id', (req, res) => {
    //Check if the course exists 
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Not available Chief');

    //Input Validation
    const {
        error,
        value
    } = validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    //Update the course
    course.name = value.name;

    console.log(course.name);

    //Return the updated course 
    res.send(`Your course has been updated: ${course.name}`);
    console.log(course);
});

//DELETE REQUEST 
app.delete('/api/courses/:id', (req, res) => {
    //Check if course exists 
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course ID you are looking for is not available Chief');

    //Deleting a course from an array 
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

function validateCourse(course) {
    //Validate the incoming request
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}

//GET REQUESTS
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course you dey find no dey available boss');
    res.send(course);
});

var port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port} ...`));














// const Logger = require('./logger');



// const logger = new Logger();

// //Register a Listener
// logger.on('logging', (arg) => {
//     console.log('Listener called', arg);
// });

// //Raising an event
// logger.log('logging');