const express = require('express');
const app = express();
const Module = require('../models/module');
const Review = require('../models/review')

//NEW
app.post('/modules/reviews', (req, res) => {
  Review.create(req.body).then(review => {
    console.log(review);
    res.redirect(`/modules/${review.moduleId}`);
  }).catch((err) => {
    console.log(err.message);
    });
});

// DELETE
app.delete('/modules/reviews/:id', function (req, res) {
  console.log("DELETE review")
  Review.findByIdAndRemove(req.params.id).then((review) => {
    res.redirect(`/modules/${review.moduleId}`);
  }).catch((err) => {
    console.log(err.message);
    });
});

module.exports = app;