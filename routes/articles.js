const express = require('express');
const router = express.Router();

let Article = require('../models/article');
let User = require('../models/user');

var mongoose  = require('mongoose');
var upload    = require('./add_article');

function checkIfAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/users/login');
  }
}





function addArticle(res, req) {
  let is_correct = validateArticle(req, res);
  console.log(is_correct);
  if(is_correct){
    res.render('add_article', {
      title:'Add Article',
      errors:is_correct
    });
  } else {
    saveArticle(req, res);
  }
}


function saveArticle(req, res){
  upload(req, res,(error) => {
    if(error){
      res.redirect('/?msg=3');
    }else{
      if(req.file == undefined){

        // res.redirect('/?msg=2');
        req.flash('failure','File undefined');

      }else{

        var fullPath = "../files/"+req.file.filename;

        var document = {
          path:     fullPath,
          caption:   req.body.caption,
          title: req.body.title,
          author: req.user._id,
          body: req.body.body
        };

        var article = new Article(document);
        article.save(function(error){
          if(error){
            console.log(error);
            return;
          }
          else {
            req.flash('success','Article Added');
            res.redirect('/');
          }
        });
      }
    }
  });

}


function updateArticle(req, res){
  upload(req, res,(error) => {
    let document = {};
    let fullPath = "../files/" + req.file.filename;

    document.title = req.body.title;
    document.author = req.body.author;
    document.body = req.body.body;
    document.caption = req.body.caption;
    document.path = fullPath;

    var article = new Article(document);

    let query = {_id: req.params.id}

    article.update(query, function (err) {
      if (err) {
        console.log(err);
      } else {
        req.flash('success', 'Article Updated');
        res.redirect('/');
      }
    });
  })
}


function deleteArticle(req, res){
  if(!req.user._id){
    res.status(500).send();
  }

  let query = {_id:req.params.id}

  Article.findById(req.params.id, function(err, article){
    if(article.author != req.user._id){
      res.status(500).send();
    } else {
      Article.remove(query, function(err){
        if(err){
          console.log(err);
        }
        res.send('Article removed');
      });
    }
  });
}

function renderArticleById(req, res){

  Article.findById(req.params.id, function(err, article){
    User.findById(article.author, function(err, user){
      res.render('article', {
        article: article,
        author: user.name
      });

    });
  });
}



function renderArticleToEditById(req, res){
  Article.findById(req.params.id, function(err, article){
    if(article.author != req.user._id){
      req.flash('danger', 'Not Authorized');
      res.redirect('/');
    }
    res.render('edit_article', {
      title:'Edit Article',
      article:article
    });
  });
}


function validateArticle(req, res){
  // req.checkBody('title','Title is required').notEmpty();
  // req.checkBody('body','Body is required').notEmpty();
  return req.validationErrors();
}


function renderAddingArticlePage(res){
  res.render('add_article', {
    title:'Add Article'
  });
}


router.get('/add', checkIfAuthenticated, function(req, res){
  renderAddingArticlePage(res);
});


router.post('/add', function(req, res){
  addArticle(res, req);
});


router.get('/edit/:id', checkIfAuthenticated, function(req, res){
  renderArticleToEditById(req, res);
});


router.post('/edit/:id', function(req, res){
  updateArticle(req, res);
});

router.delete('/:id', function(req, res){
  deleteArticle(req, res);
});

router.get('/:id', function(req, res){
  renderArticleById(req, res);
});


router.post('/find', function(req, res){
  console.log("Not implemented");
});



module.exports = router;
