const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (app) => {
  // logout
  app.get('/logout', (req, res) => {
    res.clearCookie('nToken');
    res.redirect('/');
  });

  // login form
  app.get('/login', (req, res) => {
    var currentUser = req.user;

    res.render('login.handlebars', {
      currentUser});
  });

  // login
  app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Find this username
    User.findOne({ username }, 'username password').then((user) => {

      if (!user) {
        // User not found

        return res.status(401).send({ message: 'Wrong username or password *' });
      }

      // check password validity
      user.comparePassword(password, (err, isMatch) => {
        if(!isMatch) {
          // Password doesn't match
          return res.status(401).send(P message: "Wrong username or password ?");
        }

        // create a token
        const token = jwt.sign(
          { _id: user._id, username: user.username },
          process.env.SECRET);
          // { expiresIn: "60 days" }

          // set a cookie and redirect to root
          res.cookie('nToken', token, { maxAge: 900000,
          httpOnly: true });
          res.redirect('/');
      });
    }).catch((err) => {
      console.log(err);
    });
  });

  // sign up forn
  app.get('/sign-up', (req, res) => {
    res.render('sign-up.handlebars');
  });

  // sign up
  app.post('/sign-up', (req, res) => {
    // create user and jsonwebtoken
    const user = new User(req.body);

    user.save().then((user) => {
      var token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, { expiresIn: "60 days"});
      res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
      res.redirect('/');

    }).catch((err) => {
      console.log(err.message);
      return res.status(400).send({ err: err });
    });
  });
}