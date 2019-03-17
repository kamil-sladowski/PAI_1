var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('find'
        // , {title:'Add Article'}
    );
    // res.redirect('/articles/display')
});


// router.post('/', function(req, res){
//     console.log("BBBBBBBB");
//     res.redirect('/articles/display'
//         // , {title:'Add Article'}
//     );
//     // res.redirect('/articles/display')
// });


module.exports = router;