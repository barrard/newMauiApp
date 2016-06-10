
var posObj;

  var geo_options = {
  enableHighAccuracy: true, 
  maximumAge        : 0, 
  timeout           : 5000
};

function successGPS(position) {
     // var myFirebaseRef = new Firebase("https://whereyoustay.firebaseio.com/newmauiweatherdata/");
console.log(position)
posObj = position
}


function handleError(error) {
      console.log( error.message)
      console.log(error)
    }



function getLocation () {
	 watchID = navigator.geolocation.getCurrentPosition(successGPS, handleError, geo_options)
  }