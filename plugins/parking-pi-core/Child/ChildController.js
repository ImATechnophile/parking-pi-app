(function () {
  'use strict';

  angular
    .module('device')
    .controller('childcontroller', childcontroller);

  /* @ngInject */
  function childcontroller(
    $scope,
    $routeParams,
    c8yDevices,
    c8yMeasurements,
    c8yAlert
  ) {

    function onFailure() {
      c8yAlert.danger('No child devices for this device');
    }


    function load() {
      //c8yDevices.detail($routeParams.deviceId).then(function (res) {
       // var device = res.data;
        //$scope.device.id = device.id;
        //$scope.device.location=device.c8y_Position;
        c8yDevices.listChildren($routeParams.deviceId).then(function (children) {
        var childrenIDs = _.map(children, 'id');
        if(childrenIDs.length !=0){
         // $scope.childrenNames = _.map(children, 'name');
          var childrenNames=_.map(children, 'name');
          console.log("name: "+childrenNames);
          for (var i = 0;i<=childrenIDs.length - 1;i++) {

           // var x={};
            var filter = {
            device: childrenIDs[i],
            fragment: 'c8y_DistanceMeasurement',
            series: 'distance'
            };
            var realtime = true;
            c8yMeasurements.latest(filter, realtime)
              .then(function (latestMeasurement) {
                var x={};
                //entrycount+=1;
                //console.log("entrycoun:"+entrycount);
                var latestMeasurement = latestMeasurement;
                var y=childrenNames;
                //console.log("nameslen: "+ y[entrycount]);
               // for(var j=0;j<y.length;j++){
               //   console.log("No: "+ y[j]);
                //}
                console.log(latestMeasurement);
                //console.log("this is latestMeasurement");
                var unit=latestMeasurement.c8y_DistanceMeasurement.distance.unit;
                var value=latestMeasurement.c8y_DistanceMeasurement.distance.value;
                var RequiredDist=value+unit;
                //console.log("RequiredDist");
                //console.log(RequiredDist);
                //var reT=latestMeasurement.time;
                x.childTime=latestMeasurement.time;
                //x.childType=latestMeasurement.type;
                //x.childrenName=childrenNames[i];
                if(RequiredDist<="200.45cm"){
                  x.childImage="parking_pi_parking-pi-core/Images/car.png";
                }
                else{
                  x.childImage="parking_pi_parking-pi-core/Images/empty.png";
                  //$scope.emptyCount+=1;
                }
                if(entrycount<y.length){
                  x.childName=y[entrycount];
                  //console.log("leng: "+y[entrycount]);
                  entrycount+=1;
                }
                $scope.ReDist.push(x);
                //$scope.ReDist.push(RequiredDist);
                //$scope.ReTime.push(latestMeasurement.time);
                
                //console.log("length: "+ $scope.ReDist.length);
                //console.log("arr: "+ $scope.ReDist);
                //console.log($scope.ReDist);
                //console.log("above arr");
                
                //console.log($scope.RequiredDist);
                //console.log("objtime: "+reT);
            });
          }
        }
        else{
          onFailure();
        }
        });

        
      //});
    }

    var entrycount=0;
    //$scope.device = {};
    $scope.ReDist=[];
   // $scope.ReTime=[];
    load();
    
    
  }
}());
