// If the player's or dealer's cards total over 21, they bust and their turn is over
// If either player has 21 with their first two cards, they win (unless they both have 21 on their first two cards, in which case it is a tie)
// If both players bust, the dealer wins
// If both players have the same score, they tie

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
    for (let i = 0; i < 52; i++) {
      numbers.push(i);
    }

    let humanCards = [];
    humanCards.push(numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]);
    humanCards.push(numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]);

    let dealerCards = [];
    dealerCards.push(numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]);
    dealerCards.push(numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]);

    this.state = {
      cards: numbers,
      humanCards,
      dealerCards,
      humanScore: 0,
      dealerScore: 0
    };

    this.hit = this.hit.bind(this);
    this.stay = this.stay.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
  }

  componentDidMount() {
    this.setState({
      humanScore: this.calculateScore(this.state.humanCards),
      dealerScore: this.calculateScore(this.state.dealerCards)
    });
  }

  hit() {
    // The player always takes their turn before the dealer
    let { humanCards, cards, dealerCards, dealerScore } = this.state;
    humanCards.push(cards.splice(Math.floor(Math.random() * cards.length), 1)[0]);

    // The dealer must hit if his cards total less than 17 and stand otherwise
    if (dealerScore < 17) {
      dealerCards.push(cards.splice(Math.floor(Math.random() * cards.length), 1)[0]);
    }

    this.setState({
      humanCards,
      dealerCards,
      cards
    });
    this.setState({
      humanScore: this.calculateScore(humanCards),
      dealerScore: this.calculateScore(dealerCards)
    });
  }

  stay() {
    // The player always takes their turn before the dealer
    let { humanCards, dealerCards, cards, dealerScore } = this.state;

    // The dealer must hit if his cards total less than 17 and stand otherwise
    if (dealerScore < 17) {
      dealerCards.push(cards.splice(Math.floor(Math.random() * cards.length), 1)[0]);
    }

    this.setState({
      dealerCards,
      cards
    });
    this.setState({
      humanScore: this.calculateScore(humanCards),
      dealerScore: this.calculateScore(dealerCards)
    });
  }

  calculateScore(array) {
    let score = 0;
    array.forEach(item => {
      if (item > 35) {
        // All cards count as their face value, except A which can be 1 or 11 and J, Q, K all count as 10
        score += 10;
      }
      else if (item > 31) {
        score += 9;
      }
      else if (item > 27) {
        score += 8;
      }
      else if (item > 23) {
        score += 7;
      }
      else if (item > 19) {
        score += 6;
      }
      else if (item > 15) {
        score += 5;
      }
      else if (item > 11) {
        score += 4;
      }
      else if (item > 7) {
        score += 3;
      }
      else if (item > 3) {
        score += 2;
      }
      else {
        score += 1;
      }
    });
    return score;
  }

  render() {
    let dealerCards;
    if (this.state.dealerCards.length) {
      dealerCards = this.state.dealerCards.map((card, index) => {
        return (
          <div className="col-sm-1 col-md-1 col-lg-1" key={index}>
            <h2>{card.toString()}</h2>
          </div>
        )
      });
    }
    let humanCards;
    if (this.state.humanCards.length) {
      humanCards = this.state.humanCards.map((card, index) => {
        return (
          <div className="col-sm-1 col-md-1 col-lg-1" key={index}>
            <h2>{card.toString()}</h2>
          </div>
        )
      });
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-8 col-md-10 col-lg-11">
            <h1 className="col-sm-8 col-md-10 col-lg-11">Blackjack Game</h1>
          </div>
          <div className="col-sm-4 col-md-2 col-lg-1">
            <img className="col-sm-4 col-md-2 col-lg-1" src="#" style={styles.card}/>
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <h3>Dealer</h3>
          </div>
        </div>
        <div className="row">
          {dealerCards}
        </div>
        <hr/>
        <div className="row">
          <div className="col-sm-4 col-md-4 col-lg-4">
            <h3>Player</h3>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4">
            <button className="btn btn-success" onClick={this.hit}>Hit</button>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4">
            <button className="btn btn-alert" onClick={this.stay}>Stay</button>
          </div>
        </div>
        <div className="row">
          {humanCards}
        </div>
      </div>
    )
  }
}

export default App;
