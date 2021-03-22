// // access sequelize server api

// // access magic seaweed api

// // put data on page for usersinfo_db (name, and input *favorite beach info* *if selected*)

// // query magic seaweed api with *favorite beach info* then put it on the the page

// // give link to live cams from magic seaweed(not open by default for better page loading)
// // if there are not cams for this beach display *no beach cams at this time*

// // buttons
// // popanimations

// let map;
// let service;
// let infowindow;

// function initMap () {
//   console.log('map loaded');
//   const usa = new google.maps.LatLng(36.2994027, -90.3098033);

//   infowindow = new google.maps.InfoWindow();

//   map = new google.maps.Map(
//     document.getElementById('map'), { center: usa, zoom: 10 });
//   service = new google.maps.places.PlacesService(map);
// };

// $(document).ready(function () {
//   // This is our API key
//   const APIKey = '8e9f917c-8817-11eb-a9f7-0242ac130002-8e9f921c-8817-11eb-a9f7-0242ac130002';

//   //   // Here we are building the URL we need to query the database
//   const baseQueryURL = 'https://api.stormglass.io/v2/';

//   // weather
//   const weatherURL = baseQueryURL + 'weather/point';

//   //   // tide
//   //   const extremePointURL = baseQueryURL + 'tide/extremes/point';
//   //   const seaLevel = baseQueryURL + 'tide/sea-level/point';
//   //   const stationsListURL = baseQueryURL + 'tide/stations';
//   //   const stationsAreaURL = baseQueryURL + 'stations/area';

//   // astronomy
//   const astronomyURL = baseQueryURL + 'astronomy/point';

//   const weatherParams = 'airTemperature,humidity,cloudCover,precipitation,windSpeed';
//   const tideParams = 'currentSpeed,currentDirection';
//   const marineParams = 'waveHeight,swellHeight,swellDirection,swellPeriod,waterTemperature';
//   const astronomyParams = 'sunrise,sunset,moonrise,moonset,moonPhase';

//   // search for city/beach
//   const citiesSearched = [];
//   $('#searchText').on('change', function (event) {
//     const searchText = $('#searchText').val();
//     if (searchText.length >= 3) {
//       const request = {
//         query: searchText,
//         fields: ['name', 'geometry', 'formatted_address']
//       };
//       service.findPlaceFromQuery(request, function (results, status) {
//         if (status === google.maps.places.PlacesServiceStatus.OK) {
//           const bounds = new google.maps.LatLngBounds();
//           let marker;
//           results.forEach(place => {
//             $('#searchResults').append('<li>Name: ' + place.name + ' Address: ' + place.formatted_address + ' Long/Lat: ' + place.geometry.location.lng() + '/' + place.geometry.location.lat() + '</li>');
//             marker = createMarker(place);
//             bounds.extend(marker.getPosition());
//             getWeatherInfo(place);
//             getTideInfo(place);
//             getMarineInfo(place);
//             getAstronmyInfo(place);
//           });
//           map.fitBounds(bounds);
//         }
//       });
//     }
//   });

//   function createMarker (place) {
//     if (!place.geometry || !place.geometry.location) return;
//     const marker = new google.maps.Marker({
//       map,
//       position: place.geometry.location
//     });
//     google.maps.event.addListener(marker, 'click', () => {
//       infowindow.setContent(place.name || '');
//       infowindow.open(map);
//     });
//     return marker;
//   };

//   function getWeatherInfo (place) {
//     fetch(`${weatherURL}?lat=${place.geometry.location.lat()}&lng=${place.geometry.location.lng()}&params=${weatherParams}`, {
//       headers: {
//         'Authorization': APIKey
//       }
//     }).then((response) => response.json()).then((jsonData) => {
//       console.log(jsonData);
//     });
//   }
//   function getTideInfo (place) {
//     fetch(`${weatherURL}?lat=${place.geometry.location.lat()}&lng=${place.geometry.location.lng()}&params=${tideParams}`, {
//       headers: {
//         'Authorization': APIKey
//       }
//     }).then((response) => response.json()).then((jsonData) => {
//       console.log(jsonData);
//     });
//   }
//   function getMarineInfo (place) {
//     fetch(`${weatherURL}?lat=${place.geometry.location.lat()}&lng=${place.geometry.location.lng()}&params=${marineParams}`, {
//       headers: {
//         'Authorization': APIKey
//       }
//     }).then((response) => response.json()).then((jsonData) => {
//       console.log(jsonData);
//     });
//   }
//   function getAstronmyInfo (place) {
//     fetch(`${astronomyURL}?lat=${place.geometry.location.lat()}&lng=${place.geometry.location.lng()}&params=${astronomyParams}`, {
//       headers: {
//         'Authorization': APIKey
//       }
//     }).then((response) => response.json()).then((jsonData) => {
//       console.log(jsonData);
//     });
//   }
// });
// //   const time = undefined;

// //   // tide info
// //   const extremeTide = undefined;//look at example on api need lat and lng with params
// //   const highTide = undefined;//look at example on api need lat and lng with params
// //   const lowTide = undefined;//look at example on api need lat and lng with params
