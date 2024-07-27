
export default class PopUP {
  constructor(text_msg, color) {
    // register functions
    this.removeFromScreen = this.removeFromScreen.bind(this);

    let template = document.querySelector("#templatepopup");
    this.element = template.cloneNode(true);

    this.element.className = "popup";
    this.element.querySelector(".title").textContent = text_msg;
    this.element.style.backgroundColor = color;

    let delBtn = this.element.querySelector(".delete");
    delBtn.addEventListener("click", this.removeFromScreen);
  }


  removeFromScreen() {
    console.log("deleting popup")
    this.element.remove();
  }
}
