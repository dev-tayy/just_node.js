const express = require("express");
const router = express.Router();
const {validate} = require("../utils/joi_validation");
const mongodb = require("mongodb");
const Customer = require("../models/customers");


//GET REQUESTS
router.get("/", async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get("/:id", async (req, res) => {
    var objectId = mongodb.ObjectId.isValid(req.params.id);
    console.log(objectId);

    if (!objectId) return res.status(400).send("Bad Request: ID is not valid");

    const customer = await Customer.findById(req.params.id);
    console.log(customer);

    if (!customer)
        return res.status(404).send("The customer you dey find no dey available boss");

    res.send(customer);
});


//POST REQUEST
router.post("/", async (req, res) => {
    //Input Validation
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });

    customer = await customer.save();

    res.send(customer);
});

//PUT REQUEST
router.put("/:id", async (req, res) => {
    var objectId = mongodb.ObjectId.isValid(req.params.id);
    console.log(objectId);

    if (!objectId) return res.status(400).send("Bad Request: ID is not valid");

    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold

    }, {
        new: true
    });
    console.log(customer);

    if (!customer) return res.status(404).send("The customer with the given ID does not exist.");

    res.send(customer);

});

//DELETE REQUEST
router.delete("/:id", async (req, res) => {
    var objectId = mongodb.ObjectId.isValid(req.params.id);
    console.log(objectId);

    if (!objectId) return res.status(400).send("Bad Request: ID is not valid");

    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer)
        return res
            .status(404)
            .send("The customer with the given ID does not exist Chief");

    res.send(customer);
});


module.exports = router;