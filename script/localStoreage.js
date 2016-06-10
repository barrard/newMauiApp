var savedDataTime;
var currrentTimeIs = new Date()

if(localStorage.data){
  var numberOfKeys = _.keys(JSON.parse(localStorage.data)).length
  mauiWeatherData = JSON.parse(localStorage.data)
  console.log('We got saved data already boss, saved in object mauiWeatherData with '+numberOfKeys+' keys')
 
  var result = $('#result')
  result.append('we have '+numberOfKeys+' keys in the localStorage.data', '<p>Local Data is defined, so were getting this form there!')
 
  if (numberOfKeys != 0) {
  clientWeatherData=[]
   //removeAllMarkers()
  console.log(mauiWeatherData);
  for (var i in mauiWeatherData){
    clientWeatherData.push(mauiWeatherData[i])
    if(clientWeatherData.length == _.keys(mauiWeatherData).length){
      console.log('one call to initMap after a second')
      setTimeout(function(){
      initMap()
      },100)
      console.log(clientWeatherData)}
  }
}
  // if()
  // savedDataStatus=JSON.parse(localStorage.data)
  // for (var k in savedDataStatus) {savedDataStatus=savedDataStatus[k].data.currently.time}

}
