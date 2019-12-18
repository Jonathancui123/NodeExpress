const express = require('express')
const router = express.Router();
const index = require('../index')

router.get('/', (req, res)=>{
    index.getCourses()
        .then( result => {
            console.log(result)
            res.send(result)
        })
})

module.exports = router;