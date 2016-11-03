// There will only be 2 players - the "human" player and the dealer
// The players are each dealt 2 cards to start the hand
// The player can choose to hit one or more times, or stand with any amount
// The dealer must hit if his cards total less than 17 and stand otherwise
// If the player's or dealer's cards total over 21, they bust and their turn is over
// If either player has 21 with their first two cards, they win (unless they both have 21 on their first two cards, in which case it is a tie)
// If both players bust, the dealer wins
// If both players have the same score, they tie
// The player always takes their turn before the dealer
// All cards count as their face value, except A which can be 1 or 11 and J, Q, K all count as 10
// The deck should be shuffled before each game
// You do not need to implement advanced blackjack rules (split, double or insurance)
// Only one deck will be used per game

import React, { Component } from 'react';

const styles = {
  card: {
    border: '1px solid black',
    width: '200px',
    height: '200px'
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    let numbers = [];
    for (let i = 0; i < 53; i++) {
      numbers.push(i);
    }

    let humanCards = [];
    humanCards.push(numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]);
    humanCards.push(numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]);

    let dealerCards = [];
    dealerCards.push(numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]);
    dealerCards.push(numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]);

    this.state = {
      turn: false,
      cards: numbers,
      humanCards: humanCards,
      dealerCards: dealerCards
    };

    this.changeTurn = this.changeTurn.bind(this);
    this.hit = this.hit.bind(this);
    this.stay = this.stay.bind(this);
  }

  changeTurn() {
    if (this.state.turn) {
      this.setState({turn: false});
    } else {
      this.setState({turn: true});
    }
  }

  hit() {
    this.setState({humanCards: this.state.humanCards + 1});
  }

  stay() {
    this.setState({turn: true});
  }

  render() {
    let dealerCards;
    if (this.state.dealerCards.length) {
      dealerCards = this.state.dealerCards.map(card => {
        console.log(card);
        <h2>{card.toString()}</h2>
      });
    }
    let humanCards;
    if (this.state.humanCards.length) {
      humanCards = this.state.humanCards.map(card => {
        console.log(card);
        <h2>{card.toString()}</h2>
      })
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-8 col-md-10 col-lg-11">
            <h1>Blackjack Game</h1>
          </div>
          <div className="col-sm-4 col-md-2 col-lg-1">
            <img src="#" style={styles.card}/>
          </div>
        </div>
        <hr/>
        <div className="row">
          <h3>Dealer</h3>
        </div>
        <div className="row">
          {dealerCards}
        </div>
        <hr/>
        <div className="row">
          <h3>Player</h3>
        </div>
        <div className="row">
          {humanCards}
        </div>
        <div className="row">
          <button className="btn btn-sm" onClick={this.hit} disabled={this.state.turn}>Hit</button>
          <button className="btn btn-sm" onClick={this.stay} disabled={this.state.turn}>Stay</button>
        </div>
      </div>
    )
  }
}

export default App;
