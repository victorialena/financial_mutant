import Card from "./card.js";
import Mover from "./mover.js";

export default class App {
  constructor() {
    // this.cards = [];
    this.num_cards = 0;
    this.mover = new Mover();
  }

  addCard(col, title, color) {
    this.num_cards += 1;

    let columns = document.body.getElementsByClassName('section');
    let card = new Card(title, color);
    card.element.id = this.num_cards;
    
    card.addToCol(columns[col], this.mover);
    return card;
    // this.cards.push(card)
  }

  //TODO
}
