const express = require('express');
const Joi = require('joi');
const router = express.Router();

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

//JOI VALIDATION
function validateCourse(course) {
    //Validate the incoming request
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}


//POST REQUEST
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
    //Check if course exists 
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course ID you are looking for is not available Chief');

    //Deleting a course from an array 
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

//GET REQUESTS
router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course you dey find no dey available boss');
    res.send(course);
});

module.exports = router;