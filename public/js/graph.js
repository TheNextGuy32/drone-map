const drawChart = () => {
//  console.log('running chart');

  $.get("./../drone-data.csv", function(csvString) {
    let arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
    let data = new google.visualization.arrayToDataTable(arrayData);
    //console.log(data);
    let view = new google.visualization.DataView(data);
        view.setColumns([0,21]);
    console.log(data.getColumnLabel(0));
    console.log(data.getColumnLabel(20));
    let options =   {
        hAxis: {title: data.getColumnLabel(0)},
        vAxis: {title: data.getColumnLabel(21), minValue: data.getColumnRange(21).min, maxValue: data.getColumnRange(21).max},
        legend: { position: "none" },
        }
    let chart = new google.charts.Bar(document.getElementById('warGraph'));
    chart.draw(view, google.charts.Bar.convertOptions(options));
  });

  // time of day graph
  $.get("./../timeOfDay.csv", function(csvString) {
    let arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
    let data = new google.visualization.arrayToDataTable(arrayData);
    //console.log(data);
    let view = new google.visualization.DataView(data);
    console.log(data.getColumnLabel(0));
    console.log(data.getColumnLabel(1));
    view.setColumns([0,1]);
    let options =   {
        hAxis: {title: data.getColumnLabel(0)},
        vAxis: {title: data.getColumnLabel(1), minValue: data.getColumnRange(1).min, maxValue: data.getColumnRange(1).max},
        legend: { position: "none" },
      };
    let chart = new google.charts.Bar(document.getElementById('timeOfDay'));
    chart.draw(view, google.charts.Bar.convertOptions(options));
  });

  // strikes per location

  $.get("./../strikesPerLocation.csv", function(csvString) {
    let arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
    let data = new google.visualization.arrayToDataTable(arrayData);
    //console.log(data);
    let view = new google.visualization.DataView(data);
        view.setColumns([0,1]);
    console.log(data.getColumnLabel(0));
    console.log(data.getColumnLabel(1));
    let options =   {
        hAxis: {title: data.getColumnLabel(0)},
        vAxis: {title: data.getColumnLabel(1), minValue: data.getColumnRange(1).min, maxValue: data.getColumnRange(1).max},
        legend: { position: "none" },
        }
    let chart = new google.charts.Bar(document.getElementById('strikesPerLocation'));
    chart.draw(view, google.charts.Bar.convertOptions(options));
  });


  // tribal Region
  $.get("./../tribalRegion.csv", function(csvString) {
    let arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
    let data = new google.visualization.arrayToDataTable(arrayData);
    //console.log(data);
    let view = new google.visualization.DataView(data);
        view.setColumns([0,1]);
    console.log(data.getColumnLabel(0));
    console.log(data.getColumnLabel(1));
    let options =   {
        hAxis: {title: data.getColumnLabel(0)},
        vAxis: {title: data.getColumnLabel(1), minValue: data.getColumnRange(1).min, maxValue: data.getColumnRange(1).max},
        legend: { position: "none" },
        }
    let chart = new google.charts.Bar(document.getElementById('tribalRegion'));
    chart.draw(view, google.charts.Bar.convertOptions(options));
  });

};


google.charts.load('current', {'packages':['bar']});
google.charts.setOnLoadCallback(drawChart);
// window.onload = drawChart;
