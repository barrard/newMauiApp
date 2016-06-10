
var markers = [];
var map;
var heatMapData = []


     map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 20.78881630731087,
        lng: -156.3409423828125},
    scrollwheel: false,
    zoom: 10
  });
   map.addListener('click', function(e) {

     var lat = e.latLng.lat()
     var lng = e.latLng.lng()
     var geocoder = new google.maps.Geocoder;
     var myLatLng = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng())
     geocoder.geocode({'location': myLatLng}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        var myLatlng = new google.maps.LatLng( lat, lng );

         placeClicked = results[1].formatted_address
              console.log(placeClicked);
                 $.ajax({
                        url: 'https://api.forecast.io/forecast/ee56df7c95dbc07fbfe02bb565ee45fd/' + lat + ',' + lng,
                        dataType:'jsonp',
                        //data : ,
                         success: function(result){
   console.log(result)
                          var weatherIcon = '<i class="wi wi-'+result.currently.icon+'"></i>';
                          console.log(result.currently.icon)
                          var marker = new MarkerWithLabel({
                                 position: myLatlng,
                                 // draggable: true,
                                 // raiseOnDrag: true,
                                 labelContent: weatherIcon,
                                 map: map,
                                 icon: ' ',
                                 labelAnchor: new google.maps.Point(22, 50),
                                 title:placeClicked+' '+result.currently.summary,
                                 labelClass: "labels", // the CSS class for the label
                                 labelStyle: {opacity: 0.75}
                               });
                  }

              // });

      })
    }
       })

     console.log('hello world')
   })





function timeUpdate(){
  var now = new Date()
 var timeUpdate = new Date(JSON.parse(localStorage.timeForData).time*1000)
 var unixTime = timeUpdate.getTime()
 var now = now.getTime()
 var delta = now - unixTime
 console.log(delta/1000/60)
 if( delta/1000/60 > 60){
  console.log('UPDATE THIS OLD SHIT ')
  localStorage.removeItem('data')
}
  else{console.log('Its not too old yet')}
 $('#timeUpdate').html(timeUpdate)
}

$('#deleteLocalStorage').on('click', function(){
  localStorage.removeItem('data')
})

$('#selectForcastData').on('change', function(){
  console.log(this.value)
  var scale = this.value
  var database = new Firebase('https://oregonweather.firebaseio.com/'+scale)
  database.on('value', function(snapshot){
    var forcastData = snapshot.val()
    for( var k in forcastData){
      console.log(k)
      console.log(forcastData[k][scale])
    }
    var forcastDataPoints = _.keys(forcastData[k][scale].data).length
    console.log(forcastDataPoints+ ' data points in '+scale+' array')
  })
})


 function initMap() {
//getGPScoords()
markers = []
  if (clientWeatherData && (clientWeatherData.length > 0)) {
    console.log('it exists '+clientWeatherData.length);
    timeUpdate()
  for (i in clientWeatherData){
 
     console.log(clientWeatherData[i])
   var myLatlng = new google.maps.LatLng(clientWeatherData[i].currently.latitude, clientWeatherData[i].currently.longitude);
  var weatherIcon = '<i class="wi wi-'+clientWeatherData[i].currently.currently.icon+'"></i>';



  var marker = new MarkerWithLabel({
         position: myLatlng,
         // draggable: true,
         // raiseOnDrag: true,
         labelContent: weatherIcon,
         icon: ' ',
         labelAnchor: new google.maps.Point(22, 50),
         title:clientWeatherData[i].townName+' '+clientWeatherData[i].currently.currently.summary,
         labelClass: "labels", // the CSS class for the label
         labelStyle: {opacity: 0.75}
       });


  markers.push(marker)
  if (markers.length === clientWeatherData.length) {
    console.log('addAllMarkers()')
    addAllMarkers();
    console.log('marker= '+markers.length+' and data = '+clientWeatherData.length)
   } else{console.log('Push more markers '+ markers.length + ' or more Data? '+clientWeatherData.length)}

}
  }else{console.log('Make it work bro! no client weather Data yet, got to call FIREBASE!~')}
};
  // Create a map object and specify the DOM element for display.





var myLatlng = new google.maps.LatLng(20.78881630731087, -156.3409423828125);


$('#initMap').on('click', function(){ initMap() })
$('#newuser').on('click', function(){ 
  if (typeof localStorage.newuser === 'undefined') { 

    $('#newuser').html('<input type="text" name="" value="" placeholder="">')
  };
})
$(document).on('ready', function(){
  console.log('ready!')
	initMap()
loadScript()
if (typeof localStorage.newuser ==='undefined') {
  function newuser(){
    console.log('IM NEW USER!!!')
    }
  }else{
    console.log('my name is '+ localStorage.newuser)
  }

})





$('#myLocation').on('click', function(){
  setHeatMap()
})



function addAllMarkers(){ 

  console.log('lets do this')
  var x=0
  if (markers.length === 0) { initMap()}


  markerInterval = setInterval(function(){ 


    try {
      markers[x].setMap(map)
    }catch(err){
      console.log(err);
      location.reload();
            }
    x++
    if(x>=markers.length){
      console.log('end')
      clearInterval(markerInterval)}
   }, 100);

    // for(var x = 0; x<markers.length;x++){
    //  markers[x].setMap(map)
    // }
   }
 

 function removeAllMarkers(){

for(var x = 0;x<markers.length;x++){

 markers[x].setMap(null)
}
}


 $('#addMarker').on('click', function(e){
  if (e) {console.log(e)};
  getFireBaseData()})

$('#removeMarker').on('click', function(){removeAllMarkers()})



function loadScript(){
	var s = document.createElement("script");
	s.type = "text/javascript";
	s.src = "./script/markerwithlabels.js";
	$("head").append(s);
  console.log('loadScript()')

}


  var geo_options = {
  enableHighAccuracy: true, 
  maximumAge        : 0, 
  timeout           : 5000
};

function successGPS(position) {
  console.log('Success gpd function call back fired')
if (position.coords.accuracy < 201) {  
 $('#result').html('')
   for (k in position.coords){ $('#result').append(k+ ' : ' + position.coords[k]+'<br>') }
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        speed: position.coords,
        altitude: position.coords.altitude,
        heading: position.coords.heading,

        timestamp:position.timestamp
         };
         if(typeof myFirebaseRef !== "undefined"){
          console.log('myFirebaseRef is defined')
         myFirebaseRef.child('location').push(
                                 pos,
                        function(err){
                          if(err){console.log(err) }
                            else{console.log('Saved Loc')}
                    })
       }else{
        console.log('no firebase ref, lets use local storage')
        var myGpsLocalStore=[]
        if(localStorage.getItem('myGpsLocalStore') === null){
        myGpsLocalStore.push(JSON.parse(localStorage.getItem('myGpsLocalStore')))
        localStorage.setItem('myGpsLocalStore', JSON.stringify(myGpsLocalStore))
       }else{
        var myGpsLocalStore = [];
           myGpsLocalStore = JSON.parse(localStorage.getItem('myGpsLocalStore'));
           myGpsLocalStore.push(pos);
           localStorage.setItem('myGpsLocalStore', JSON.stringify(myGpsLocalStore));
       }
     }
      var marker = new google.maps.Marker({
       position: pos,
        map: map,
       title: 'Hello World!'
     });

console.log(watchID)
      // infoWindow.setPosition(pos);
      // infoWindow.setContent('Location found.');
      map.setCenter(pos);
      console.log(map.getZoom())
      //map.setZoom(12)
}else{ 
console.log('Last ditch effort')
  navigator.geolocation.getCurrentPosition(function(position){
  var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
console.log(JSON.stringify(position))
  var marker = new MarkerWithLabel({
         position: myLatlng,
         // draggable: true,
         // raiseOnDrag: true,
         labelContent: 'You are here',
         icon: ' ',
         map:map,
         labelAnchor: new google.maps.Point(22, 50),
         labelClass: "labels", // the CSS class for the label
         labelStyle: {opacity: 0.75}
       });
  localStorage.setItem('userGpsObj', JSON.stringify(myLatlng))
}, function(error){console.log('we got Error! '+ error.message)
},  {maximumAge:600000, timeout:0}); }
}
function handleError(error) {
      console.log( error.message)
      console.log(error)
    }

function getLocation () {
	 watchID = navigator.geolocation.watchPosition(successGPS, handleError, geo_options)
  }

$('#myLocation').on('click', function(){ getLocation(); })

$('#stopTracking').on('click', function(){ navigator.geolocation.clearWatch(watchID); })


function addHeatMap(){
  var heatMapData = []


}

