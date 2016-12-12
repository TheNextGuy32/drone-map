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
  var large = new google.maps.Map(document.getElementById('large-map'), {
    zoom:8,
    center: new google.maps.LatLng(32.5,70),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDoubleClickZoom: false,
  });
  var small = new google.maps.Map(document.getElementById('small-map'), {
    zoom:9,
    center: new google.maps.LatLng(33,70),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDoubleClickZoom: false,
  });
  var city = new google.maps.Map(document.getElementById('city-map'), {
    zoom:11,
    center: new google.maps.LatLng(32.95,70.2),
    mapTypeId: google.maps.MapTypeId.SATELLITE,
    disableDoubleClickZoom: false,
  });
  
  //  Remove headers
  console.dir(data[0]);
  data.splice(0,1);

  var tolerance = 0.005;
  //  Cleaning out duplicates
  for(var x = 0 ; x < data.length ; x++) {
    for(var y = x+1 ; y < data.length ; y++) {

      if(Math.abs(data[x][4] - data[y][4]) <= tolerance && Math.abs(data[x][5] - data[y][5]) <= tolerance) {
        //  Combine these two together in kills
        data[x][0] += " " + data[y][0];
        for(var d = 7; d<28; d++) {
          if(Number.isInteger(data[x][d]) && Number.isInteger(data[y][d])) {
            data[x][d] = 0 + parseInt(data[x][d]) + parseInt(data[y][d]);
          }
        }
        data.splice(y,1);
        
      }
    }
  }

  for(var m = 0 ; m < data.length ; m++) {

    var imageBase = "../images/"
    var image = imageBase + "famas.png";
    var type = "Military";
    if(data[m][23] > 0 || data[m][25] > 0) {
      //  Civilains and children, war crime?
      type = "Collateral";
      image = imageBase + "civilian.png";
    }
    else if(data[m][21] > 20) {
      //  Particularly deadly
      type = "Deadly";
      image = imageBase + "water-drop.png";
    }
    // else if(data[m][27] > data[m][21]) {
    //   //  More injured than killed
    //   type = "Graze";
    //   image = imageBase + "health.png";
    // }
    else if(data[m][17] >= 4) {
      //  More injured than killed
      type = "Emplacement";
      image = imageBase + "building.png";
    }

    contentString =`<b>${type} Strike(s) ${data[m][0]}</b>`;
    contentString +=`<ul>`;
    if(data[m][25] > 0) 
      contentString += `<li>${data[m][25]} <b>children</b> killed</li> `
    if(data[m][23] > 0) 
      contentString += `<li>${data[m][23]} <b>civilians</b> killed</li> `
    if(data[m][21] > 0)
      contentString += `<li>${data[m][21]} soldiers killed</li> `;
    if(data[m][27] > 0)    
      contentString += `<li>${data[m][27]} injured</li>`;
    if(data[m][17] > 0)
      contentString += `<li>${data[m][17]} buildings damaged</li>`;
    contentString += `</ul></p>`;
    
    var coords = new google.maps.LatLng(data[m][4],data[m][5]);
    
    var largeMapMarker = new google.maps.Marker({map: large, icon: image, position: coords});
    largeMapMarker.infoWindow = new google.maps.InfoWindow({content:contentString});
    google.maps.event.addListener(largeMapMarker,'click', function() {this.infoWindow.open(large, this);});

    var smallMapMarker = new google.maps.Marker({map: small, icon: image, position: coords});
    smallMapMarker.infoWindow = new google.maps.InfoWindow({content:contentString});
    google.maps.event.addListener(smallMapMarker,'click', function() {this.infoWindow.open(small, this);});

    var cityMapMarker = new google.maps.Marker({map: city, icon: image, position: coords});
    cityMapMarker.infoWindow = new google.maps.InfoWindow({content:contentString});
    google.maps.event.addListener(cityMapMarker,'click', function() {this.infoWindow.open(city, this);});
  }
}