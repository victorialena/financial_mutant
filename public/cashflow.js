// import updateBudget from "circle_chart.js";

var income = 0;
var min_mo_debt = 0;

function calcIncome(event) {
  event.preventDefault();

  var income_flag = document.getElementById('income_flag').value;
  var balance = document.getElementById('income_val').value;
  switch(income_flag) {
    case "yearly":
      income = balance/12;
      break;
    case "biweekly":
      income = balance*2;
      break;
    case "hourly":
      income = balance*40*52/12;
      break;
    default:
      break;
  }
  income = income.toFixed(2);
  document.getElementById("incomeprompt").innerHTML = `Your montly income amounts to $${income}!`;
}

document.getElementById("income_flag").addEventListener("change", calcIncome);
document.getElementById("income_val").addEventListener("change", calcIncome);

// document.querySelector("#updateBudget").addEventListener("click", updateBudget);