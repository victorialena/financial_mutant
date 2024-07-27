/* Text to add to the move here button */
const MOVE_HERE_TEXT = "— Move here —";

export default class Mover {
  constructor() {
    this._card = null;
    this.startMoving = this.startMoving.bind(this);
    this.completeMove = this.completeMove.bind(this);
  }

  startMoving(card) {
    if (this._card !== null) {
      this.clean();
    }

    this._card = card;

    let btn = document.createElement("button");
    btn.textContent = MOVE_HERE_TEXT;
    btn.className = "moveHere";

    let columns = document.body.getElementsByClassName('section');

    for (let col in ['todo', 'doing', 'done']) {
      let cards = columns[col].querySelectorAll(".card");
      for (let i = 0; i < cards.length; ++i) {
        let new_btn = btn.cloneNode(true)
        new_btn.addEventListener("click", this.completeMove);
        columns[col].insertBefore(new_btn, cards[i]);  
      }
      let new_btn = btn.cloneNode(true)
      new_btn.addEventListener("click", this.completeMove);
      columns[col].append(new_btn);
    }
    this._card.className = "cardInMotion";
  }

  completeMove(event) {
    event.currentTarget.after(this._card);
    this.clean();
  }

  clean() {
    if (this._card !== null) {
      this._card.className = "card";
    }

    let btns = document.querySelectorAll(".moveHere");
    for (let i = 0; i < btns.length; ++i) {
      btns[i].remove();
    }
    this._card = null;
  }

  stopMoving() {
    this.clean();
  }
}
