const mongoose = require('mongoose');

console.log("Running")

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => { console.log('Connected to DB') })
    .catch((err) => { console.error("Error caught: ", err) });

const courseSchema = new mongoose.Schema({
    _id: String,
    tags: [String],
    date: Date,
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
})

const courses = mongoose.model('courses', courseSchema);

async function getCourses() {
    var queriedCourses = await courses.find({ isPublished: true })
        .or([{ price: { $gte: 15 } }, { name: /.*by.*/ }])
        // .or([{ tags: 'frontend' }, { tags: 'backend' }])
        .sort({ price: -1 })
        .select({ name: 1, author: 1, price: 1 })
    console.log(queriedCourses)
}

// getCourses();

async function updateCourse(id) {
    const course = await courses.findById(id);
    if (!course) { console.log("course not found"); return; }

    course.isPublished = false;
    course.author = 'hehe xd';

    const result = await course.save();
    console.log(result);
}

updateCourse('5a68ff090c553064a218a547')


