var clientWeatherData = [];


function getFireBaseData(){
   myFirebaseRef = new Firebase("https://oregonweather.firebaseio.com/");
var mauiWeatherData = {};
if((localStorage.timeForData === undefined)|| (new Date() - new Date(JSON.parse(localStorage.timeForData).time*1000))> 1000*60*60 ){
  console.log('Get the time!!!')
  myFirebaseRef.child('timeForData').once("value", function(snapshot) {
    localStorage.setItem('timeForData', JSON.stringify(snapshot.val()))
    console.log(snapshot.val())
        console.log('The database has data from this time, now so does localStorage '+new Date(snapshot.val().time *1000))
  
  })
}else {
    console.log('THIS SHIT IS FUN!!!!!!! we got some early data')

    
    
  }
// if((localStorage.data === undefined) || (_.keys(JSON.parse(localStorage.data)))===0){
//   console.log('we getting this from FireBase!!')
//   var localDataState = typeof localStorage.data
//   var res = $('#result')
//     res.append('<p>Local Data is '+localDataState+', so were getting this form Firebase!')
// // Attach an asynchronous callback to read the data at our posts reference
// myFirebaseRef.child('newmauiweatherdata').on("value", function(snapshot) {
//   console.log('setting local storage.data')
//    // localStorage.setItem('data', JSON.stringify(clientWeatherData))
//    mauiWeatherData = snapshot.val()
//    localStorage.setItem('data', JSON.stringify(mauiWeatherData))
//    clientWeatherData=[]
//    console.log('we got an on value event on Data!')
//    removeAllMarkers()
//   console.log(mauiWeatherData);
//   for (var i in mauiWeatherData){
//     clientWeatherData.push(mauiWeatherData[i])
//     if(clientWeatherData.length == _.keys(mauiWeatherData).length){
//       console.log('one call to initMap')
//       initMap()
//       console.log(clientWeatherData)}
//   }
// }, function (errorObject) {
//   if (!errorObject) {console.log('clientWeatherData is ready')};
//   console.log("The read failed: " + errorObject.code);
// });


// }else{console.log('we got local data already')}

var currently = new Firebase('https://oregonweather.firebaseio.com/newmauiweatherdata')

currently.on('value', function(snapshot){
  console.log(snapshot.val())
  currently = snapshot.val()
  clientWeatherData=[]
     console.log('we got an on value event on Data!')
     removeAllMarkers()
    console.log(currently);
    for (var i in currently){
      console.log(i)
      var newObj = {townName:i, currently: currently[i]}
      clientWeatherData.push(newObj)
      if(clientWeatherData.length == _.keys(currently).length){
        console.log(clientWeatherData)
        console.log('one call to initMap')
        initMap()
        }
    }
})

}//all that firebase code getFirebaseFunction
function getGPScoords(){
  myFirebaseRef.child('location').once("value", function(snapshot) {
    localStorage.setItem('myGPScoords', JSON.stringify(snapshot.val()))
    var numberGPSkeys = _.keys(snapshot.val()).length
    console.log('GETTING '+numberGPSkeys+' GPS COORDS BOSS!!')
      var data = JSON.parse(localStorage.myGPScoords)
      for(var k in data){
      var latlng =  new google.maps.LatLng(data[k].lat, data[k].lng)
      heatMapData.push(latlng)

    }
  })
 

}

function setHeatMap(){
  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatMapData
  });
  heatmap.setMap(map);
}








