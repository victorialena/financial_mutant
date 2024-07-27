import PopUP from "./popup.js";

// var coll = document.getElementsByClassName("collapsible");
// var i;

// for (i = 0; i < coll.length; i++) {
//   coll[i].addEventListener("click", function() {
//     this.classList.toggle("active");
//     var content = this.nextElementSibling;
//     if (content.style.display === "block") {
//       content.style.display = "none";
//     } else {
//       content.style.display = "block";
//     }
//   });
// }

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

// function myPopUP(err_msg) {
//   var popup = document.getElementById("myPopup");
//   popup.popuptext = err_msg;
//   popup.classList.toggle("show");
// }


function handleAddCCDebt(event) {
  event.preventDefault()

  var table = document.getElementById("ccDebtTable");

  var balance = document.getElementById('cellThree').value;
  var min_mo_pay = document.getElementById('cellFour').value;
  
  if (min_mo_pay > 0.05*balance) {
    var err_msg = "Your monthly payment seems oddly high. Did you miss a payment recently?";
    console.log(err_msg);
    new PopUP(err_msg, 'orange')
    return;
  }

  var row = table.insertRow(1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);

  cell1.textContent = document.getElementById('cellOne').value;
  cell2.innerHTML = document.getElementById('cellTwo').value;
  cell3.innerHTML = balance;
  cell4.innerHTML = min_mo_pay;

  document.getElementById('addCCDebt').reset();
}

document.querySelector("#addCCButton").addEventListener("click", handleAddCCDebt);
