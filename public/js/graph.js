const drawChart = () => {
  console.log('running chart');
  $.get("./../drone-data.csv", function(csvString) {
    let arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
    let data = new google.visualization.arrayToDataTable(arrayData);
    let view = new google.visualization.DataView(data);
        view.setColumns([0,1]);
    let options =   {
        hAxis: {title: data.getColumnLabel(0), minValue: data.getColumnRange(0).min, maxValue: data.getColumnRange(0).max},
        vAxis: {title: data.getColumnLabel(1), minValue: data.getColumnRange(1).min, maxValue: data.getColumnRange(1).max},
        legend: 'none'
        }
    let chart = new google.visualization.PieChart(document.getElementById('warGraph'));
    chart.draw(view, options);
  });
}

window.onload = drawChart;
