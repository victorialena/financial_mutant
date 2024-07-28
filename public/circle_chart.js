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
    // slices: {
    //   0: { color: 'yellow' },
    //   1: { color: 'transparent' }
    // },
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