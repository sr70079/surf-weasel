// // // access sequelize server api

// // // access magic seaweed api

// // // put data on page for usersinfo_db (name, and input *favorite beach info* *if selected*)

// // // query magic seaweed api with *favorite beach info* then put it on the the page

// // // give link to live cams from magic seaweed(not open by default for better page loading)
// // // if there are not cams for this beach display *no beach cams at this time*

// // // buttons
// // // popanimations
// let map;
// let service;
// let infowindow;

// function initMap () {
//   console.log('map loaded');
//   var sydney = new google.maps.LatLng(-33.867, 151.195);

//   infowindow = new google.maps.InfoWindow();

//   map = new google.maps.Map(
//   document.getElementById('map'), {center: sydney, zoom: 15});
//   //   var request = {
//   //     query: 'Museum of Contemporary Art Australia',
//   //     fields: ['name', 'geometry'],
//   //   };

//   //   var service = new google.maps.places.PlacesService(map);

//   //   service.findPlaceFromQuery(request, function(results, status) {
//   //     if (status === google.maps.places.PlacesServiceStatus.OK) {
//   //       for (var i = 0; i < results.length; i++) {
//   //         createMarker(results[i]);
//   //       }
//   //       map.setCenter(results[0].geometry.location);
//   //     }
//   //   });
// };

// $(document).ready(function() {
// // This is our API key
// const googleAPIKey = 'AIzaSyCXn93WsnSypxsm5kEisCHg_K8ZyNeVf4U';
// const APIKey = '8e9f917c-8817-11eb-a9f7-0242ac130002-8e9f921c-8817-11eb-a9f7-0242ac130002';

// // Here we are building the URL we need to query the database
// const baseQueryURL = 'https://api.stormglass.io/v2/';

// // weather
// const weatherURL = baseQueryURL + 'weather/point';
// // bio
// const bioURL = baseQueryURL + 'bio/point';
// // tide
// const extremePointURL = baseQueryURL + 'tide/extremes/point';
// const seaLevel = baseQueryURL + 'tide/sea-level/point';
// const stationsListURL = baseQueryURL + 'tide/stations';
// const stationsAreaURL = baseQueryURL + 'stations/area';
// // astronomy
// const astronomyURL = baseQueryURL + 'astronomy/point';
// // solar
// const solarURL = baseQueryURL + 'solar/point';
// // elevation
// const elevationURL = baseQueryURL + 'elevation/point';

// // search for city/beach
// const citiesSearched = [];

// $('#searchText').on('change', function (event) {
//   const searchText = $('#searchText').val();
//   if (searchText.length >= 3) {
//     $.ajax({
//       method: 'GET',
//       url: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + encodeURI(searchText) + '&inputtype=textquery&fields=formatted_address,name,geometry&key=' + googleAPIKey
//     }).then((result) => {
//       $('#searchResults').empty();
//       result.forEach(place => {
//         $('#searchResults').append('<li>Name: ' + place.name + ' Address: ' + place.formatted_address + ' Long/Lat: ' + place.location.lng + '/' + place.location.lat + '</li>');
//       });
//     });
//   }
// });

// const createCity = function(response) {

// };

// const time = undefined;

// // weahter info
// const airTemperature= undefined; //in degrees celsius - can convert to F
// const humidity = undefined;
// const cloudCover = undefined;
// const precipitation = undefined;
// const windSpeed = undefined;

// // tide info
// const extremeTide = undefined;//look at example on api need lat and lng with params
// const highTide = undefined;//look at example on api need lat and lng with params
// const lowTide = undefined;//look at example on api need lat and lng with params
// const currentSpeed = undefined;
// const currentDirection = undefined;

// // marine weather
// const waveHeight= undefined;
// const swellHeight = undefined;
// const swellDirection = undefined;
// const swellPeriod = undefined;
// const waterTemperature = undefined;

// // astronmy info
// const sunrise = undefined;
// const sunset = undefined;
// const moonrise = undefined;
// const moonset = undefined;
// const moonPhase = undefined;

// });
