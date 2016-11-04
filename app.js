const PORT = process.env.PORT || 8000;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

// APP DECLARATION
const app = express();

// GENERAL MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// BROWSERIFY BUNDLE
app.use(express.static(__dirname + '/static'));
app.use('/bundle', express.static(path.join(__dirname, 'bundle')));

// VIEW ENGINE DECLARATION
app.set('view engine', 'html');

// SERVER LISTEN
app.listen(PORT, err => {
  if (err) throw err;
  console.log(`Server listening to port ${PORT}`);
});
