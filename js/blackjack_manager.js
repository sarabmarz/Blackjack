//Blackjack oop

let game = null;

function debug(an_object) {
  document.getElementById("debug").innerHTML = JSON.stringify(an_object);
}

function buttons_initialization() {
  document.getElementById("card").disabled = false;
  document.getElementById("stand").disabled = false;
  document.getElementById("new_game").disabled = true;
}

function finalize_buttons() {
  document.getElementById("card").disabled = true;
  document.getElementById("stand").disabled = true;
  document.getElementById("new_game").disabled = false;
}

//FUNÇÕES QUE DEVEM SER IMPLEMENTADAS PELOS ALUNOS

function new_game() {
  let cards = null;
  buttons_initialization();
  game = new BlackJack();
  dealer_new_card();
  dealer_new_card();
  cards = game.get_dealer_cards();
  cards[1] = "B"; // primeira carta vazia
  document.getElementById("dealer").innerHTML = "";
  createCard(document.getElementById("dealer"), cards);
  player_new_card();
  player_new_card();
  cards = game.get_player_cards();
}

// function new_game() {
//   buttons_initialization();
//   game = new BlackJack();
//   dealer_new_card();
//   player_new_card();
//   dealer_new_card();
//   player_new_card();
//   //  debug(game);
// }

function finalNumbers() {
  var finalPlayer = document.getElementsByClassName("player-final");
  var finalDealer = document.getElementsByClassName("dealer-final");

  for (var i = 0; i < finalPlayer.length; i++) {
    finalPlayer[i].innerHTML =
      "Your Points: <br>" +
      game.get_cards_value(game.get_player_cards()) +
      " points";
  }

  for (var i = 0; i < finalDealer.length; i++) {
    finalDealer[i].innerHTML =
      "Dealer Points: <br>" +
      game.get_cards_value(game.get_dealer_cards()) +
      " points";
  }
}

function update_player(state) {
  // document.getElementById("player").textContent = game.get_player_cards();
  document.getElementById("player-info").textContent =
    game.get_cards_value(game.get_player_cards()) + " points";
  if (state.gameEnded) {
    finalNumbers();
    document.getElementById("player-info").textContent += state.playerBusted
      ? document.querySelector("#playerLose").classList.add("visible")
      : document.querySelector("#dealerLose").classList.add("visible");
    finalize_buttons();
  }
}

// function update_player(state) {
//   document.getElementById("player").textContent = game.get_player_cards();
//   document.getElementById("player-info").textContent =
//     game.get_cards_value(game.get_player_cards()) + " points";
//   if (state.gameEnded) {
//     document.getElementById("player-info").textContent += state.playerBusted
//       ? "\r\n You're Busted!"
//       : "\r\n You Won!";
//     finalize_buttons();
//   }
// }

function update_dealer(state) {
  document.getElementById("dealer").textContent = game.get_dealer_cards();
  document.getElementById("dealer-info").textContent =
    game.get_cards_value(game.get_dealer_cards()) + " points";
  if (state.gameEnded) {
    finalNumbers();
    document.getElementById("dealer-info").textContent += state.dealerWon
      ? document.querySelector("#dealerWin").classList.add("visible")
      : document.querySelector("#dealerLose").classList.add("visible");
    finalize_buttons();
  }
}

// function update_dealer(state) {
//   document.getElementById("dealer").textContent = game.get_dealer_cards();
//   document.getElementById("dealer-info").textContent =
//     game.get_cards_value(game.get_dealer_cards()) + "points";
//   if (state.gameEnded) {
//     document.getElementById("dealer-info").textContent += state.dealerWon
//       ? "Dealer Won :( Better Luck Next Time!"
//       : "YOU WIN!";
//     finalize_buttons();
//   }
// }

function player_new_card() {
  let state = game.player_move();
  let card = game.get_player_cards();
  document.getElementById("player").innerHTML = "";
  update_player(state);
  createCard(document.getElementById("player"), card);
  return state;
}

// function player_new_card() {
//   const state = game.player_move();
//   update_player(state);
//   return state;
// }

function dealer_new_card() {
  const state = game.dealer_move();
  update_dealer(state);
  return state;
}

function dealer_finish() {
  game.setDealerTurn(true);
  let state = game.get_game_state();
  let cards = game.get_dealer_cards();
  let sum = game.get_cards_value(cards);
  if (sum >= 17) {
    state.gameEnded = true;
    update_dealer(state);
  }
  while (!state.gameEnded) {
    cards = game.get_dealer_cards();
    sum = game.get_cards_value(cards);

    document.getElementById("dealer").innerHTML = cards;
    dealer_new_card();
    update_dealer(state);
  }
  cards = game.get_dealer_cards();
  finalNumbers();
  createCard(document.getElementById("dealer"), cards);
}

// function dealer_finish() {
//   game.setDealerTurn(true);
//   let state = game.get_game_state();
//   update_dealer(state);
//   while (!state.gameEnded) {
//     state = dealer_new_card();
//   }
// }

function createCard(player, cards) {
  for (let i = 0; i < cards.length; i++) {
    var img = document.createElement("IMG");

    if (cards[i] === "B") {
      img.src = "img/new/Back.svg";
    } else {
      img.src = "img/new/" + cards[i] + ".svg";
    }

    img.classList.add("dealt");

    player.appendChild(img);
  }
}

function restart_game() {
  var popUp = document.getElementsByClassName("popUp");

  for (var i = 0; i < popUp.length; i++) {
    popUp[i].classList.remove("visible");
  }

  new_game();
}

// function draw_cards() {
//   const imgElement = document.createAttribute("img");
//   imgElement.src = "img/png/card_back.png";
//   imgElement.className = "playing-card";
//   document.getElementById("player").appendChild(imgElement);
// }
