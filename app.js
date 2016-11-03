// There will be only 2 players – a “human” player and a dealer
//
// The players are each dealt 2 cards to start the hand
//
// The player can choose to hit one or more times, or stand with any amount
//
// The dealer must hit if his cards total less than 17 and stand otherwise
//
// If the player’s or dealer’s cards total over 21, they bust and their turn is over
//
// If either player has 21 with their first two cards, they win (unless they both have 21 on their first
//
// two cards, in which case it is a tie)
//
// If both players bust, the dealer wins
//
// If both players have the same score, they tie
//
// The player always takes their turn before the dealer
//
// All cards count as their face value, except A which can be 1 or 11 and J, Q, K all count as 10
//
// The deck should be shuffled before each game
//
// You do not need to implement advanced blackjack rules (split, double or insurance)
//
// Only one deck will be used per game
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

app.use(express.static(__dirname + '/static'));
app.use('/bundle', express.static(path.join(__dirname, 'bundle')));
app.set('view engine', 'html');


// SERVER LISTEN
app.listen(PORT, err => {
  if (err) throw err;
  console.log(`Server listening to port ${PORT}`);
});
