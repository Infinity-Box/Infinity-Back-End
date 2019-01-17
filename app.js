const express = require('express');
require('dotenv').config();
const methodOverride = require('method-override');
const app = express();

//Mongoose Connection
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Infinity-Back-End', { useNewUrlParser:true});

const Review = require('./models/review');
const Module = require('./models/module');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 3000;
app.listen(port);

app.use(express.static(__dirname));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var exphbs = require('express-handlebars');

//Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

require('./controllers/auth.js')(app);
require('./controllers/modules')(app);
require('./controllers/reviews')(app);

module.exports = app;
module.exports.stop = () => {
    return db.close()
};