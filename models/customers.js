const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        required: true,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 11,
        maxlength: 12

    },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;