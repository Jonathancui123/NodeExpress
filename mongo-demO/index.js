const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to the MongoDB...'))
    .catch(err => console.error('Could not connect to mongoDB', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String, 
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
})