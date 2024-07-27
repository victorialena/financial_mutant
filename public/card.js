/* The text to use when description is empty */
const NO_DESCRIPTION_TEXT = "(No description)";

export default class Card {
  constructor(title, color) {
    this.removeFromList = this.removeFromList.bind(this);
    this._initializeEdit = this._initializeEdit.bind(this);
    this._updateEdit = this._updateEdit.bind(this);
    this._startMove = this._startMove.bind(this);

    let template = document.querySelector("#template");
    this.element = template.cloneNode(true);
    this._mover = null;

    this.element.className = "card";
    this.element.querySelector(".title").textContent = title;
    this.element.querySelector(".description").textContent = NO_DESCRIPTION_TEXT;
    this.element.style.backgroundColor = color;

    let edtBtn = this.element.querySelector(".edit");
    edtBtn.addEventListener("click", this._initializeEdit);

    let delBtn = this.element.querySelector(".delete");
    delBtn.addEventListener("click", this.removeFromList);

    let edtField = this.element.querySelector(".editDescription");
    edtField.addEventListener("blur", this._updateEdit);
  }

  addToCol(colElem, mover) {
    colElem.append(this.element);
    this._mover = mover;
    this._mover.stopMoving();
    
    let movBtn = this.element.querySelector(".startMove");
    movBtn.addEventListener("click", this._startMove);
  }

  _startMove() {
    this._mover.startMoving(this.element);
  }

  _selectText() {
    const input = this.element.querySelector(".editDescription");
    input.select();
  }
  
  _updateEdit() {
    let input = this.element.querySelector(".editDescription");
    let desc = this.element.querySelector(".description");

    desc.textContent = input.value;
    input.className = "editDescription hidden";
    desc.className = "description";
  }

  _initializeEdit() {
    let desc = this.element.querySelector(".description");
    let input = this.element.querySelector(".editDescription");

    desc.className = "description hidden";
    input.className = "editDescription";

    input.placeholder = desc.textContent
    input.focus();
    input.select();
  }

  setDescription(text) {
    if (text === '') {
      text = NO_DESCRIPTION_TEXT;
    }
    this.element.querySelector(".description").textContent = text;
  }

  removeFromList() {
    this._mover.stopMoving();
    console.log("deleting")
    this.element.remove();
  }
}
