const express = require('express')
const router = express.Router();

function genreValidate(genre){
    const schema = Joi.object({
      name: Joi.string().min(3).required()
    })

    const result = schema.validate(genre);
    console.log(result);
    return (result);
}

const genres = [
    {id: 1, name: "horror"},
    {id: 2, name: "romance"},
    {id: 3, name: "action"}
]

router.get('/', (req, res) => {
    res.send(genres);
})

router.get('/:id', (req, res)=> {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("Error, ID not found");
    res.send(genre.name);
})

router.post('/', (req, res) => {
    const result = genreValidate(req.body)
    if (result.error) return res.status(400).send(`Invalid naming for genre: ${result.error.details[0].message}`);

    const genre = {
        id: genres.length+1, 
        name: req.body.name
    }
    genres.push(genre);
    res.send(genre);
})

router.put('/:id', (req, res) => {
    // check if their naming for the genre is valid
    // If invalid, return error 400
    // Else, update the genre name and return the genre as a response
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("Error, ID not found");
    if (!genreValidate(req.body)) return res.status(400).send("Invalid naming for genre");

    genre.name = req.body.name;
    res.send(genre);
    })

router.delete('/:id', (req, res) => {
    // see if the genre exists
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("Error, ID not found");
    // if it does, delete it and return the genre that was deleted
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
})

module.exports = router;
