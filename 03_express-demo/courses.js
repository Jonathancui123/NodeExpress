const express = require('express')
const router = express.Router();

const courses = [
        { id: 1, name: 'course1' },
        { id: 2, name: 'course2' },
        { id: 3, name: 'course3' }
    ]

    router.get('/', (req, res) => {
        res.send(courses);
    })

    router.post('/', (req, res) => {
        const result = validateCourse(req.body);    
        if (result.error) {
            res.status(400).send(`Bad request. Course invalid, ${result.error.details.message}`)
            return;
        }

        const course = {
            id: courses.length + 1,
            name: req.body.name
        };
        courses.push(course);
        res.send(course);
    })

    router.get('/:id', (req, res) => {
        const course = courses.find(c => c.id === parseInt(req.params.id));
        if (!course) res.status(404).send("The required course was not found");
        else res.send(course);
    })

    router.put('/:id', (req, res) => {
        // Look up the course
        const course = courses.find(c => c.id === parseInt(req.params.id));
        // If the course doesn't exist, return 404
        if (!course) {
            res.status(404).send("The required course was not found!");
            return;
        }

        // if the course exists, validate the course 
        // if the course is invalid then return 400 -> bad request
        const result = validateCourse(req.body);
        if (result.error) {
            res.status(400).send(`Bad request. Course invalid, ${result.error.details[0].message}`)
            return;
        }

        // update course 
        course.name = req.body.name;
        // return the course to the cient
        res.send(course);
    })

    router.delete('/:id', (req, res) => {
        const course = courses.find(c => c.id === parseInt(req.params.id));
        if (!course) res.status(404).send("Requested resource not found");

        const index = courses.indexOf(course);
        courses.splice(index, 1);

        res.send(course);
    })

    function validateCourse(course) {
        const schema = Joi.object({
            name: Joi.string().min(3).required()
        })
        // if the course is invalid then return 400 -> bad request
        const result = schema.validate(course);
        console.log( result)
        return(result);

    }

module.exports = router;