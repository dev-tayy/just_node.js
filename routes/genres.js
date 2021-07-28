const express = require("express");
const Joi = require("joi");
const router = express.Router();
const Genre = require("../models/genres");
const mongodb = require("mongodb");

//JOI VALIDATION
function validateGenre(genre) {
    //Validate the incoming request
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    });

    return schema.validate(genre);
}

//GET REQUESTS
router.get("/", async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get("/:id", async (req, res) => {
    var objectId = mongodb.ObjectId.isValid(req.params.id);

    if (!objectId) return res.status(400).send("Bad Request: ID is not valid");

    const genre = await Genre.findById(req.params.id);

    if (!genre)
        return res.status(404).send("The genre you dey find no dey available boss");

    res.send(genre);
});


//POST REQUEST
router.post("/", async (req, res) => {
    //Input Validation
    const {
        error
    } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({
        name: req.body.name,
    });

    genre = await genre.save();

    res.send(genre);
});

//PUT REQUEST
router.put("/:id", async (req, res) => {
    var objectId = mongodb.ObjectId.isValid(req.params.id);

    if (!objectId) return res.status(400).send("Bad Request: ID is not valid");

    const {
        error
    } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, {
        new: true
    });

    if (!genre) return res.status(404).send("The genre with the given ID does not exist.");

    res.send(genre);

});

//DELETE REQUEST
router.delete("/:id", async (req, res) => {
    var objectId = mongodb.ObjectId.isValid(req.params.id);

    if (!objectId) return res.status(400).send("Bad Request: ID is not valid");

    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre)
        return res
            .status(404)
            .send("The genre with the given ID does not exist Chief");

    res.send(genre);
});


module.exports = router;