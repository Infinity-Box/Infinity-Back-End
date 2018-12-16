const express = require('express');
const app = express();
const Module = require('../models/module.js')
const Review = require('../models/review.js');
var admin = require('../app')

// INDEX
  app.get('/', (req, res) => {
    Module.find()
      .then(modules => {
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
    app.post('/modules', (req, res) => {
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
        if (admin == false) {
        res.render('modules-show', { module: module, reviews: reviews });
        } else {
        res.render('modules-show-admin', { module: module, reviews: reviews })
        }
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
        .then(module => {
          res.redirect(`/modules/${module._id}`)
        })
        .catch(err => {
          console.log(err.message)
      });
    });

// // DELETE
//     app.delete('/modules/:id', function (req, res) {
//       console.log("DELETE module")
//       Module.findByIdAndRemove(req.params.id).then((module) => {
//         res.redirect('/');
//       }).catch((err) => {
//         console.log(err.message);
//         });
//     });
}

module.exports = app;