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
    // Fills numbers array with integers 0 to 51
    for (let i = 0; i < 52; i++) {
      numbers.push(i);
    }

    // The players are each dealt 2 cards to start the hand
    let humanCards = [];
    // Randomly selects 2 numbers between 0 to 51 and adds to player's cards
    // Also, by using splice, removes picked random cards from deck
    humanCards.push(numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]);
    humanCards.push(numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]);

    let dealerCards = [];
    // Randomly selects 2 numbers between 0 to 51 and adds to dealer's cards
    // Also, by using splice, removes picked random cards from deck
    dealerCards.push(numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]);
    dealerCards.push(numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]);

    // INITIAL STATE OF COMPONENT
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
    this.hit = this.hit.bind(this); // FUNCTION TO HIT
    this.stay = this.stay.bind(this); // FUNCTION TO STAY

    this.calculateScore = this.calculateScore.bind(this); // TO CALCULATE SCORE
    this.reDeal = this.reDeal.bind(this); // TO PLAY NEW TURN
  }

  componentDidMount() {
    // When the component mounts, set the score by invoking calculateScore function
    this.setState({
      humanScore: this.calculateScore(this.state.humanCards),
      dealerScore: this.calculateScore(this.state.dealerCards)
    });
  }

  hit() {
    let { humanCards, cards, dealerCards, dealerScore, humanScore } = this.state;

    // Randomly selects a card from the deck, removes from deck, and adds to player's hand
    humanCards.push(cards.splice(Math.floor(Math.random() * cards.length), 1)[0]);

    // The player always takes their turn before the dealer

    // The dealer must hit if his cards total less than 17 and stand otherwise
    if (dealerScore < 17) {
      dealerCards.push(cards.splice(Math.floor(Math.random() * cards.length), 1)[0]);
    }

    // After work is done, recalculate score
    humanScore = this.calculateScore(humanCards);
    dealerScore = this.calculateScore(dealerCards);

    // Set the state of the component after work is done
    this.setState({
      humanCards,
      dealerCards,
      cards,
      humanScore,
      dealerScore
    });

    // If after hit, either score is over 21, the game ends
    if (humanScore > 21 || dealerScore > 21) {
      this.setState({
        end: true
      });
    }
  }

  stay() {
    let { humanCards, dealerCards, cards, dealerScore } = this.state;

    // The player always takes their turn before the dealer

    // The dealer must hit if his cards total less than 17 and stand otherwise
    if (dealerScore < 17) {
      dealerCards.push(cards.splice(Math.floor(Math.random() * cards.length), 1)[0]);
    }

    // Set the state after work
    // Game always ends at stay
    this.setState({
      dealerCards,
      cards,
      humanScore: this.calculateScore(humanCards),
      dealerScore: this.calculateScore(dealerCards),
      end: true
    });
  }

  calculateScore(array) {
    // Function takes an array of cards and calculates score based on what cards
    let score = 0;

    array.forEach(item => {
      // Algorithm to score hand based on cards

      if (item > 35) {
        // All cards count as their face value, except A which can be 1 or 11 and J, Q, K all count as 10
        // Cards 36 - 51 are 19's, J's, Q's, K's of Clubs, Hearts, Spades, Diamonds
        score += 10;
      }
      else if (item > 31) {
        // Cards 32 - 35 are 9's of Clubs, Hearts, Spades, Diamonds
        score += 9;
      }
      else if (item > 27) {
        // Cards 28 - 31 are 8's of Clubs, Hearts, Spades, Diamonds
        score += 8;
      }
      else if (item > 23) {
        // Cards 24 - 27 are 7's of Clubs, Hearts, Spades, Diamonds
        score += 7;
      }
      else if (item > 19) {
        // Cards 20 - 23 are 6's of Clubs, Hearts, Spades, Diamonds
        score += 6;
      }
      else if (item > 15) {
        // Cards 16 - 19 are 5's of Clubs, Hearts, Spades, Diamonds
        score += 5;
      }
      else if (item > 11) {
        // Cards 12 - 15 are 4's of Clubs, Hearts, Spades, Diamonds
        score += 4;
      }
      else if (item > 7) {
        // Cards 8 - 11 are 3's of Clubs, Hearts, Spades, Diamonds
        score += 3;
      }
      else if (item > 3) {
        // Cards 4 - 7 are 2's of Clubs, Hearts, Spades, Diamonds
        score += 2;
      }
      else {
        // Cards 0 - 3 are A's of Clubs, Hearts, Spades, Diamonds
        if (score >= 21) {
          score += 1;
        }
        score += 11;
      }
    });

    // Output is score
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
    // Randomly selects player cards again
    humanCards.push(numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]);
    humanCards.push(numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]);

    let dealerCards = [];
    // Randomly selects dealer cards again
    dealerCards.push(numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]);
    dealerCards.push(numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]);

    // Set state to original when component mounted
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
    if (this.state.end) {
      // If the game ended, show dealer cards
      DealerCards = this.state.dealerCards.map((card, index) => {
        let imgSrc = `./images/${card}.png`;
        return (
          <div className="col-sm-1 col-md-1 col-lg-1" key={index}>
            <img src={imgSrc} style={styles.card}></img>
          </div>
        )
      });
    } else {
      // If the game has not ended, show 2 backward cards
      DealerCards = (
        <div>
          <div className="col-sm-1 col-md-1 col-lg-1">
            <img src="./images/52.png" style={styles.card}></img>
          </div>
          <div className="col-sm-1 col-md-1 col-lg-1">
            <img src="./images/52.png" style={styles.card}></img>
          </div>
        </div>
      )
    }

    let HumanCards;
    if (this.state.humanCards.length) {
      // For every player card, show the corresponding picture
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

    // To show who won and how
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
