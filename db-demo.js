const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost/testDB", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, )
    .then(() => console.log("Connected to MongoDB successfully..."))
    .catch((err) => console.log("Could not connect to MongoDB", err));

//Schema defines the shape of the documents within a collection in a MongoDB Database
const coursesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            message: 'A course should have at least on tag.',
            validator: function (v, callback) {
                setTimeout(() => {
                    //Do your async work
                    const result = v && v.length > 0;
                    callback(result);
                }, 1000);
            }
        }
    },
    price: {
        type: Number,
        required: function () {
            return this.isPublished;
        },
        min: 10,
        max: 200
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'desktop'],
        lowercase: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    author: String,
    isPublished: Boolean,

});

const Course = mongoose.model('Course', coursesSchema);

async function createDatabase() {

    const course = new Course({
        name: 'Flutter Course',
        author: 'Angela Yu',
        category: 'web',
        tags: ['mobile', 'frontend'],
        isPublished: true,
        price: 15
    });
    try {
        const result = await course.save();
        console.log(result);
    } catch (ex) {
        for (field in ex.errors) {
            console.log(ex.errors[field].message);
        }
    }
}

createDatabase();

async function getCourses() {
    const courses = await Course.find({
        author: 'Mosh',
        isPublished: true
    }).sort({
        name: 1
    }).select({
        name: 1,
        tags: 1,
        author: 1,
        isPublished: 1
    });
    console.log(courses);
}
//getCourses();

//add two numbers together
