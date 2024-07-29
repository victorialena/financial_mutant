var default_table = [['Category', 'Budget'], ['Remaining', Math.random()]];

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);


function drawChart(tabular_data=default_table) {

  var data = google.visualization.arrayToDataTable(tabular_data);
  var options = {
    // 'title':'Monthly Budget',
    'width':500, 
    'height':500,
    'pieHole': 0.5,
    'legend': {'alignment': 'center'},
    'pieSliceText': 'none',
    'colors': ['#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabed4', '#469990', '#dcbeff', '#9A6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#a9a9a9',],
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
}

function readBudgetTable() {
  var chart_data = [['Category', 'Budget'], ['debt', min_mo_debt]];
  var budget = document.getElementById("budget");
  var inputs = budget.getElementsByTagName("input");

  var total_spending = 0;

  for (let ui = 0; ui < inputs.length; ui++) {
    if (inputs[ui].value !== "") {
      chart_data.push([inputs[ui].id, parseFloat(inputs[ui].value)]);
      total_spending = total_spending + parseFloat(inputs[ui].value);
    }
  }

  var remaining = income - total_spending;
  document.getElementById("budget_remainder").innerHTML = `$${remaining}`;

  if (remaining > 0) {
    chart_data.push(["remaining", remaining]);
  }

  return chart_data;
}

function updateBudget(event) {
  event.preventDefault();
  var data = readBudgetTable();
  drawChart(data);
}

document.querySelector("#updateBudget").addEventListener("click", updateBudget);