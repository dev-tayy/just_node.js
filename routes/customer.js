const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {
    validateData
} = require("../routes/joi_validation");

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
});

const Customer = mongoose.model("Customer", customerSchema);


//GET REQUESTS
router.get("/", async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get("/:id", async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer)
        return res.status(404).send("The customer you dey find no dey available boss");

    res.send(customer);
});


//POST REQUEST
router.post("/", async (req, res) => {
    //Input Validation
    const {
        error
    } = validateData(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name: req.body.name,
    });

    customer = await customer.save();

    res.send(customer);
});

//PUT REQUEST
router.put("/:id", async (req, res) => {
    //Input Validation
    const {
        error
    } = validateData(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, {
        new: true
    });
    console.log(customer);
    if (!customer) return res.status(404).send("The customer with the given ID does not exist.");

    res.send(customer);

});

//DELETE REQUEST
router.delete("/:id", async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer)
        return res
            .status(404)
            .send("The customer with the given ID does not exist Chief");

    res.send(customer);
});


module.exports = router;