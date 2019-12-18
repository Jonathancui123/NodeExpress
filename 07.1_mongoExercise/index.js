const express = require('express');
const app = express();
const home = require('./routes/home');
const config = require('config');
const coursepage = require('./routes/courses');

app.use('/', home);
app.use('/courses', coursepage)

const mongoose = require('mongoose');

mongoose.connect(config.get('db'));
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
        // .or([{ price: { $gte: 15 } }, { name: /.*by.*/ }])
        // .or([{ tags: 'frontend' }, { tags: 'backend' }])
        .sort({ price: -1 })
        .select({ name: 1, author: 1, price: 1 })
    // console.log(queriedCourses)
    return queriedCourses
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

// updateCourse('5a68ff090c553064a218a547')

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("Listening on port: ", port);       
})

module.exports.getCourses = getCourses;