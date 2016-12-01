window.onload = function() {
  $.get({
    url: "/data",
    success: map,
    error: function(data) {
      console.log("Error getting data.");
    }
  });
//  drawChart();
};

function map(data) {
  console.dir(data);

  var large = new google.maps.Map(document.getElementById('large-map'), {
    zoom:6,
    center: new google.maps.LatLng(32.5,70),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  var small = new google.maps.Map(document.getElementById('small-map'), {
    zoom:9,
    center: new google.maps.LatLng(33,70),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  var city = new google.maps.Map(document.getElementById('city-map'), {
    zoom:11,
    center: new google.maps.LatLng(32.95,70.2),
    mapTypeId: google.maps.MapTypeId.SATELLITE
  });
  var image = {
    url: "http://oliverbarnum.com/bomb.png",
  };
  for(var m = 0 ; m < data.length ; m++) {
    var marker = new google.maps.Marker({map: large, icon:image, position: new google.maps.LatLng(data[m][4],data[m][5])});
    var marker = new google.maps.Marker({map: small, icon:image,position: new google.maps.LatLng(data[m][4],data[m][5])});
    var marker = new google.maps.Marker({map: city, icon:image,position: new google.maps.LatLng(data[m][4],data[m][5])});
  }
  //infowindow.open(map, marker);
}
