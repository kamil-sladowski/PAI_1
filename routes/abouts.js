const express = require('express');
const router = express.Router();

let About = require('../models/about');

router.get('/about', function(req,res){
    // res.render('About me', {title:'My info', description:"descrrrrr"});
    res.send("asasaasa")
    // res.render('about', {
    //     title:"xxxx",
    //     description: "yyyy"
    // });
});

router.post('/about', function (req, res) {
    res.send('About this wiki');
})

module.exports = router;
