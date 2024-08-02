import { overlayOn } from "./collapsible.js"


function handleAddCCDebt(event) {
  event.preventDefault()

  var table = document.getElementById("ccDebtTable");

  var nickname = document.getElementById('cellOne').value;
  var interest_rate = parseFloat(document.getElementById('cellTwo').value);
  var balance = parseFloat(document.getElementById('cellThree').value);
  var min_mo_pay = parseFloat(document.getElementById('cellFour').value);

  if ((nickname === "") || isNaN(interest_rate) || isNaN(balance) || isNaN(min_mo_pay)) {
    console.log("Some fields are missing");
    document.getElementById('cellOne').placeholder = "required";
    document.getElementById('cellTwo').placeholder = "required";
    document.getElementById('cellThree').placeholder = "required";
    document.getElementById('cellFour').placeholder = "required";
    return;
  }
  
  if (min_mo_pay > 0.05*balance) {
    var err_msg = "Your monthly payment seems oddly high. Did you miss a payment recently?";
    console.log("popup: "+err_msg);
    overlayOn(err_msg);
    return;
  }

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

  cell1.textContent = nickname;
  cell2.innerHTML = interest_rate;
  cell3.innerHTML = balance;
  cell4.innerHTML = min_mo_pay;

  min_mo_debt = min_mo_debt + min_mo_pay;
  total_debt = total_debt + balance;
  document.getElementById('addCCDebt').reset();

  debts.push(new Debt(nickname, interest_rate, balance, min_mo_pay));
}

document.querySelector("#addCCButton").addEventListener("click", handleAddCCDebt);