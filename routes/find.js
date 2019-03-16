var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('find'
        // , {title:'Add Article'}
    );
});


module.exports = router;