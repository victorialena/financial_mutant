import { overlayOn } from './collapsible.js';

var net_worth = 0;

function logAssets(event) {
  event.preventDefault();
  var check_val = document.getElementById('checking').value;
  var savng_val = document.getElementById('savings').value;

  if (check_val === "" || savng_val === "") {
    console.log("Some fields are missing");
    document.getElementById('checking').placeholder = "required";
    document.getElementById('savings').placeholder = "required";
    return;
  }

  net_worth = 0;

  var checking = parseFloat(check_val);
  var savings = parseFloat(savng_val);
  var roth_bal = parseFloat(document.getElementById('401k_bal').value) * document.getElementById('401k').checked;
  var brokerage_bal = parseFloat(document.getElementById('brokerage_bal').value) * document.getElementById('brokerage').checked;

  assets = new Assets(checking, savings, roth_bal, brokerage_bal);
  net_worth = assets.sum - total_debt;

  var err_msg = `Your net worth is ${net_worth}`;
  console.log("popup: " + err_msg);
  overlayOn(err_msg);
}

document.querySelector("#saveAssets").addEventListener("click", logAssets);