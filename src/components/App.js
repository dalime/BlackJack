import React, { Component } from 'react';

const styles = {
  card: {
    height: '200px',
    border: '1px solid black'
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    let numbers = [];

    // Only one deck will be used per game
    for (let i = 0; i < 52; i++) {
      numbers.push(i);
    }

    // The players are each dealt 2 cards to start the hand
    let humanCards = [];
    humanCards.push(numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]);
    humanCards.push(numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]);

    let dealerCards = [];
    dealerCards.push(numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]);
    dealerCards.push(numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]);

    // There will be only 2 players – a “human” player and a dealer
    this.state = {
      cards: numbers,
      humanCards,
      dealerCards,
      humanScore: 0,
      dealerScore: 0,
      end: false
    };

    // The player can choose to hit one or more times, or stand with any amount
    this.hit = this.hit.bind(this);
    this.stay = this.stay.bind(this);

    this.calculateScore = this.calculateScore.bind(this);
    this.reDeal = this.reDeal.bind(this);
  }

  componentDidMount() {
    this.setState({
      humanScore: this.calculateScore(this.state.humanCards),
      dealerScore: this.calculateScore(this.state.dealerCards)
    });
  }

  hit() {
    // The player always takes their turn before the dealer
    let { humanCards, cards, dealerCards, dealerScore, humanScore } = this.state;
    humanCards.push(cards.splice(Math.floor(Math.random() * cards.length), 1)[0]);

    // The player always takes their turn before the dealer
    // The dealer must hit if his cards total less than 17 and stand otherwise
    if (dealerScore < 17) {
      dealerCards.push(cards.splice(Math.floor(Math.random() * cards.length), 1)[0]);
    }

    humanScore = this.calculateScore(humanCards);
    dealerScore = this.calculateScore(dealerCards);

    this.setState({
      humanCards,
      dealerCards,
      cards,
      humanScore,
      dealerScore
    });

    if (humanScore > 21 || dealerScore > 21) {
      this.setState({
        end: true
      });
    }
  }

  stay() {
    // The player always takes their turn before the dealer
    let { humanCards, dealerCards, cards, dealerScore } = this.state;

    // The player always takes their turn before the dealer
    // The dealer must hit if his cards total less than 17 and stand otherwise
    if (dealerScore < 17) {
      dealerCards.push(cards.splice(Math.floor(Math.random() * cards.length), 1)[0]);
    }

    this.setState({
      dealerCards,
      cards,
      humanScore: this.calculateScore(humanCards),
      dealerScore: this.calculateScore(dealerCards),
      end: true
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
        if (score >= 21) {
          score += 1;
        }
        score += 11;
      }
    });
    return score;
  }

  reDeal() {
    // The deck should be shuffled before each game
    let numbers = [];

    // Only one deck will be used per game
    for (let i = 0; i < 52; i++) {
      numbers.push(i);
    }

    let humanCards = [];
    humanCards.push(numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]);
    humanCards.push(numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]);

    let dealerCards = [];
    dealerCards.push(numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]);
    dealerCards.push(numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]);

    this.setState({
      cards: numbers,
      humanCards,
      dealerCards,
      humanScore: this.calculateScore(humanCards),
      dealerScore: this.calculateScore(dealerCards),
      end: false
    });
  }

  render() {
    let { humanScore, dealerScore, end } = this.state;

    let DealerCards;
    if (this.state.dealerCards.length) {
      DealerCards = this.state.dealerCards.map((card, index) => {
        return (
          <div className="col-sm-1 col-md-1 col-lg-1" key={index}>
            <img src="./images/52.png" style={styles.card}></img>
          </div>
        )
      });
    }
    let HumanCards;
    if (this.state.humanCards.length) {
      HumanCards = this.state.humanCards.map((card, index) => {
        let imgSrc = `./images/${card}.png`;
        return (
          <div className="col-sm-1 col-md-1 col-lg-1" key={index}>
            <img src={imgSrc} style={styles.card}></img>
          </div>
        )
      });
    }

    let finalDealerScore;
    let finalHumanScore;
    let status;
    if (end) {
      // If either player has 21 with their first two cards, they win (unless they both have 21 on their first two cards, in which case it is a tie)
      if (humanScore > 21 && dealerScore > 21) {
        // If both players bust, the dealer wins
        status = 'Bust! Dealer Wins!';
      } else if (dealerScore > 21 && humanScore <= 21) {
        // If the player's or dealer's cards total over 21, they bust and their turn is over
        status = 'Dealer Busted! Player Wins!';
      } else if (humanScore > 21 && dealerScore <= 21) {
        // If the player's or dealer's cards total over 21, they bust and their turn is over
        status = 'Bust! Dealer Wins!';
      } else if (humanScore === dealerScore) {
        // If both players have the same score, they tie
        status = 'Tie!';
      } else if (humanScore > dealerScore) {
        status = 'Player Wins!';
      } else if (dealerScore > humanScore) {
        status = 'Dealer Wins!';
      }

      finalDealerScore = dealerScore;
      finalHumanScore = humanScore;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4 col-md-4 col-lg-4">
            <h1 className="col-sm-8 col-md-10 col-lg-11">BlackJack</h1>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4">
            <h2 className="col-sm-8 col-md-10 col-lg-11">{status}</h2>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4">
            <button className="btn btn-lg btn-primary" disabled={!end} onClick={this.reDeal}>Redeal</button>
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-sm-9 col-md-9 col-lg-9">
            <h3>Dealer</h3>
          </div>
          <div className="col-sm-3 col-md-3 col-lg-3">
            <h3>{finalDealerScore}</h3>
          </div>
        </div>
        <div className="row">
          {DealerCards}
        </div>
        <hr/>
        <div className="row">
          <div className="col-sm-3 col-md-3 col-lg-3">
            <h3>Player</h3>
          </div>
          <div className="col-sm-3 col-md-3 col-lg-3">
            <button className="btn btn-lg btn-success" onClick={this.hit} disabled={end}>Hit</button>
          </div>
          <div className="col-sm-3 col-md-3 col-lg-3">
            <button className="btn btn-lg btn-alert" onClick={this.stay} disabled={end}>Stay</button>
          </div>
          <div className="col-sm-3 col-md-3 col-lg-3">
            <h3>{finalHumanScore}</h3>
          </div>
        </div>
        <div className="row">
          {HumanCards}
        </div>
      </div>
    )
  }
}

export default App;
