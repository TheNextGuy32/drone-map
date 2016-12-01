const drawChart = () => {
//  console.log('running chart');
  $.get("./../drone-data.csv", function(csvString) {
    let arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
    let data = new google.visualization.arrayToDataTable(arrayData);
    //console.log(data);
    let view = new google.visualization.DataView(data);
        view.setColumns([20,21]);
    console.log(data.getColumnLabel(1));
    console.log(data.getColumnLabel(20));
    let options =   {
        hAxis: {title: data.getColumnLabel(1), minValue: data.getColumnRange(1).min, maxValue: data.getColumnRange(1).max},
        vAxis: {title: data.getColumnLabel(20), minValue: data.getColumnRange(21).min, maxValue: data.getColumnRange(21).max},
        legend: 'none'
        }
    let chart = new google.charts.Bar(document.getElementById('warGraph'));
    chart.draw(view, google.charts.Bar.convertOptions(options));
  });
};

google.charts.load('current', {'packages':['bar']});
google.charts.setOnLoadCallback(drawChart);
// window.onload = drawChart;
