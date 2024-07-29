const DEFAULT_OVERLAY_TEXT = "[you should never see this]";

var coll = document.getElementsByClassName("collapsible");

for (var i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      // close all collapsible
      var col_content = document.getElementsByClassName("content");
      for (var j = 0; j < col_content.length; j++) {
        col_content[j].style.maxHeight = null;
      }

      // open this one
      content.style.maxHeight =  content.scrollHeight + "50px"; // "100%"
    }
  });
}

function handleAddCCDebt(event) {
  event.preventDefault()

  var table = document.getElementById("ccDebtTable");

  var balance = document.getElementById('cellThree').value;
  var min_mo_pay = document.getElementById('cellFour').value;
  
  if (min_mo_pay > 0.05*balance) {
    var err_msg = "Your monthly payment seems oddly high. Did you miss a payment recently?";
    console.log("popup: "+err_msg);
    overlayOn(err_msg);
    return;
  }

  var interest_rate = document.getElementById('cellTwo').value;

  if (interest_rate > 50) {
    var err_msg = "Bro... You took out a Payday Loan?";
    console.log("popup: "+err_msg);
    overlayOn(err_msg);
  }

  var row = table.insertRow(1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);

  cell1.textContent = document.getElementById('cellOne').value;
  cell2.innerHTML = interest_rate;
  cell3.innerHTML = balance;
  cell4.innerHTML = min_mo_pay;

  min_mo_debt = min_mo_debt + parseFloat(min_mo_pay);
  document.getElementById('addCCDebt').reset();
}

document.querySelector("#addCCButton").addEventListener("click", handleAddCCDebt);

function overlayOn(text_msg) {
  document.getElementById("overlaytext").textContent = text_msg;
  document.getElementById("overlay").style.display = "block";
  document.querySelector("#killPopup").addEventListener("click", overlayOff);
}

function overlayOff() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("overlaytext").textContent = DEFAULT_OVERLAY_TEXT;
}