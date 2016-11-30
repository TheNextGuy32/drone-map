const express = require('express');
const path = require('path');

const app = express();
const server = require('http').Server(app);

app.use(express.static(path.resolve(`${__dirname}/../public`)));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../public/index.html`));
});

server.listen(Number(process.env.PORT || 5000));
console.log(`**************************`);
console.log(`* Listening on port ${process.env.PORT || 5000} *`);
console.log(`**************************`);
/*angular.module('mapApp',[])
.factory('mapService',[
function()
{
  var mapService = {};

  mapService.loadAPI = function(res)
  {
    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
                res(null);
            }
        };
    } 
    else {  //Others
      script.onload = function(){
          res(null);
      };
    }

    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyASU6uXHlgHJXfxX1rG5UADuh73F5s4dws";
    document.getElementsByTagName("head")[0].appendChild(script);
  };

  return mapService;

}])
.controller('mapController', ['$scope','mapService',
function($scope,mapService) 
{
  $scope.startApp = function()
  {
    mapService.loadAPI(
      function(err)
      {
        if (err) {
          console.log(err);
          return;
        }

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom:10,center:new google.maps.LatLng(30.1954124,-93.8692605),mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var infowindow = new google.maps.InfoWindow({
          content:'<strong>S&T International</strong><br>TX-62 Mauriceville, TX 77626'
        });

        var marker = new google.maps.Marker({map: map, position: new google.maps.LatLng(30.1954124,-93.8692605)});

        infowindow.open(map, marker);
      });
  };
  

  $scope.startApp();
}]);*/