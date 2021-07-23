const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/testDB", { useNewUrlParser: true, useUnifiedTopology: true}, )
  .then(() => console.log("Connected to MongoDB successfully..."))
  .catch((err) => console.log("Could not connect to MongoDB", err));


async function createDatabase() {
    
//Schema defines the shape of the documents within a collection in a MongoDB Database
const coursesSchema = new mongoose.Schema({
    name: String,
    authors: String,
    tags: [String],
    date: {type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', coursesSchema);

const course = new Course({
    name: 'Angular.js Course',
    authors: 'Mosh',
    tags: ['Angular', 'Frontend'],
    isPublished: true
});

const result = await course.save();
console.log(result);
}

createDatabase();