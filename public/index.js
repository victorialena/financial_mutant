import App from "./app.js";

const main = () => {
  let app = new App();

  function handleAddCard(event) {
    event.preventDefault()
    let title = document.querySelector("#cardTitle").value;
    let color = document.querySelector("#cardColor").value;
    if (title === "") {
      console.log("error!");
      return;
    }
    app.addCard("todo", title, color);
  }
  document.querySelector("#addButton").addEventListener("click", handleAddCard);

  /* You can add cards to the board here so you don't have to type them all in every 
  time the page refreshes. Here are a few examples: */
  app.addCard("doing", "Write Card class", "lightblue");
  app.addCard("todo", "Write App class", "khaki");
  let card = app.addCard("todo", "Test everything!", "pink");
  card.setDescription("Hopefully we've been testing throughout the process...");
};

main();
