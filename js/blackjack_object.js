//Blackjack object

//constante com o número máximo de pontos para blackJack
const MAX_POINTS = 21;

// Classe BlackJack - construtor
class BlackJack {
  constructor() {
    // array com as cartas do dealer
    this.dealer_cards = [];
    // array com as cartas do player
    this.player_cards = [];
    // variável booleana que indica a vez do dealer jogar até ao fim
    this.dealerTurn = false;

    // objeto na forma literal com o estado do jogo
    this.state = {
      gameEnded: false,
      dealerWon: false,
      playerBusted: false,
    };

    //métodos utilizados no construtor (DEVEM SER IMPLEMENTADOS PELOS ALUNOS)

    this.new_deck = function () {
      const suits = ["Clubs", "Spades", "Hearts", "Diamonds"];
      const values = [
        "A",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "J",
        "Q",
        "K",
      ];
      const deck = [];

      for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < values.length; j++) {
          const card = values[j] + "-" + suits[i];
          deck.push(card);
        }
      }

      return deck;
    };

    // this.new_deck = function () {
    //     const deck = [];
    //     for(let i = 0; i < 52; i++){
    //         deck.push(1 + i % 13);
    //     }
    //     console.log('Deck:', deck);
    //     return deck;
    // };

    this.shuffle = function (deck) {
      const shuffleDeck = [];
      for (let i = 0; i < 52; i++) {
        const randomIndex = Math.floor(Math.random() * deck.length);
        shuffleDeck.push(deck[randomIndex]);
        deck.splice(randomIndex, 1);
      }
      console.log("Shuffled Deck", shuffleDeck);
      return shuffleDeck;
    };

    // baralho de cartas baralhado
    this.deck = this.shuffle(this.new_deck());
  }

  // métodos
  // devolve as cartas do dealer num novo array (splice)
  get_dealer_cards() {
    return this.dealer_cards.slice();
  }

  // devolve as cartas do player num novo array (splice)
  get_player_cards() {
    return this.player_cards.slice();
  }

  // Ativa a variável booleana "dealerTurn"
  setDealerTurn(val) {
    this.dealerTurn = val;
  }

  //MÉTODOS QUE DEVEM SER IMPLEMENTADOS PELOS ALUNOS

  get_cards_value(cards) {
    const MAX_POINTS = 21;
    let sum = 0;
  
    for (const card of cards) {
      const value = card.charAt(0);
      if (value === "A") {
        sum += 11;
      } else if (["10", "J", "Q", "K"].includes(value)) {
        sum += 10;
      } else {
        sum += parseInt(value);
      }
    }
  
    let numAces = cards.filter((card) => card.charAt(0) === "A").length;
  
    while (numAces > 0 && sum > MAX_POINTS) {
      sum -= 10;
      numAces--;
    }
  
    return sum;
  }

  //   get_cards_value(cards) {
  //     let points = 0;
  //     cards
  //       .sort()
  //       .reverse()
  //       .forEach(function (c) {
  //         console.log("Card", c);
  //         if (c === 1) {
  //           if (points + 11 > MAX_POINTS) points++;
  //           else points += 11;
  //         } else if (c >= 11) {
  //           points += 10;
  //         } else {
  //           points += c;
  //         }
  //       });

  //     return points;
  //   }

  dealer_move() {
      this.dealer_cards.push(this.deck.pop());
      return this.get_game_state();
  }


  player_move() {
      this.player_cards.push(this.deck.pop());
      return this.get_game_state();
  }

  get_game_state() {
    const playerPoints = this.get_cards_value(this.get_player_cards());
    const dealerPoints = this.get_cards_value(this.get_dealer_cards());

    const playerWon = playerPoints === MAX_POINTS;
    const playerBusted = playerPoints > MAX_POINTS;

    const dealerWon =
      this.dealerTurn &&
      dealerPoints > playerPoints &&
      dealerPoints <= MAX_POINTS;
    const dealerBusted = this.dealerTurn && dealerPoints > MAX_POINTS;

    this.state.gameEnded =
      playerWon || playerBusted || dealerWon || dealerBusted;
    this.state.playerBusted = playerBusted;
    this.state.dealerWon = dealerWon;

    return this.state;
  }
}
