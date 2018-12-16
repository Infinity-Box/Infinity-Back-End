const express = require('express')
const methodOverride = require('method-override')
const app = express()

//Mongoose Connection
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Infinity-Back-End', { useNewUrlParser:true});

const Review = require('./models/review')
const Module = require("./models/module")
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
app.listen(port);

app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }));

var exphbs = require('express-handlebars');

//Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//INDEX
app.get('/', (req, res) => {
  Module.find()
    .then(modules => {
      res.render('modules-home', {modules: modules});
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/modules', (req, res) => {
  Module.find()
    .then(modules => {
        console.log(modules)
      res.render('modules-index', {modules: modules});
    })
    .catch(err => {
      console.log(err);
    });
});
// NEW
  app.get('/modules/new', (req, res) => {
    res.render('modules-new', {});
  })

  // CREATE
  app.post('/', (req, res) => {
    Module.create(req.body)
    .then((module) => {
      console.log(module);
      res.redirect(`/modules/${module._id}`)
    }).catch((err) => {
      console.log(err.message);
    })
  })

  // SHOW
  app.get('/modules/:id', (req, res) => {
    Module.findById(req.params.id).then((module) => {
       Review.find({ moduleId: req.params.id }).then(reviews => {
      res.render('modules-show', { module: module, reviews: reviews });
  })
    }).catch((err) => {
      console.log(err.message);
  });
  });

  // EDIT
  app.get('/modules/:id/edit', (req, res) => {
    Module.findById(req.params.id, function(err, module) {
      res.render('modules-edit', {module: module});
    })
  });

// UPDATE
  app.put('/modules/:id', (req, res) => {
    Module.findByIdAndUpdate(req.params.id, req.body)
      .then(review => {
        res.redirect(`/modules/${module._id}`)
      })
      .catch(err => {
        console.log(err.message)
    });
  });

// DELETE
  app.delete('/modules/:id', function (req, res) {
    console.log("DELETE module")
    Module.findByIdAndRemove(req.params.id).then((modules) => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err.message);
      });
  });

module.exports = app