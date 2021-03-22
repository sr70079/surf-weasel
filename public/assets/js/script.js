/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
let map;
let service;
let infowindow;

function initMap () {
  console.log('map loaded');
  const usa = new google.maps.LatLng(36.2994027, -90.3098033);

  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(
    document.getElementById('map'), { center: usa, zoom: 10 });
  service = new google.maps.places.PlacesService(map);
};

$(document).ready(function () {
  // This is our API key
  const APIKey = 'dc97fb66-8b60-11eb-b62d-0242ac130002-dc97fbde-8b60-11eb-b62d-0242ac130002';

  //   // Here we are building the URL we need to query the database
  const baseQueryURL = 'https://api.stormglass.io/v2/';

  // weather
  const weatherURL = baseQueryURL + 'weather/point';

  //   // tide
  //   const extremePointURL = baseQueryURL + 'tide/extremes/point';
  //   const seaLevel = baseQueryURL + 'tide/sea-level/point';
  //   const stationsListURL = baseQueryURL + 'tide/stations';
  //   const stationsAreaURL = baseQueryURL + 'stations/area';

  // astronomy
  const astronomyURL = baseQueryURL + 'astronomy/point';

  const weatherParams = 'airTemperature,humidity,cloudCover,precipitation,windSpeed';
  const tideParams = 'currentSpeed,currentDirection';
  const marineParams = 'waveHeight,swellHeight,swellDirection,swellPeriod,waterTemperature';
  const astronomyParams = 'sunrise,sunset,moonrise,moonset,moonPhase';

  // search for city/beach
  $('#searchText').on('change', function (event) {
    const searchText = $('#searchText').val();
    if (searchText.length >= 3) {
      const request = {
        query: searchText,
        fields: ['name', 'geometry', 'formatted_address']
      };
      service.findPlaceFromQuery(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const bounds = new google.maps.LatLngBounds();
          let marker;
          results.forEach(place => {
            $('#searchResults').append('<li>Name: ' + place.name + ' Address: ' + place.formatted_address + ' Long/Lat: ' + place.geometry.location.lng() + '/' + place.geometry.location.lat() + '</li>');
            marker = createMarker(place);
            bounds.extend(marker.getPosition());
            getWeatherInfo(place);
            getTideInfo(place);
            getMarineInfo(place);
            getAstronmyInfo(place);
          });
          map.fitBounds(bounds);
        }
      });
    }
  });

  function createMarker (place) {
    if (!place.geometry || !place.geometry.location) return;
    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location
    });
    google.maps.event.addListener(marker, 'click', () => {
      infowindow.setContent(place.name || '');
      infowindow.open(map);
    });
    return marker;
  };

  function getWeatherInfo (place) {
    fetch(`${weatherURL}?lat=${place.geometry.location.lat()}&lng=${place.geometry.location.lng()}&params=${weatherParams}`, {
      headers: {
        'Authorization': APIKey
      }
    }).then((response) => response.json()).then((jsonData) => {
      let div = $('<div>');
      let cityEl = $('<h3>').text(place.name + '(' + new Date().toLocaleDateString('en-US') + ')');
      let airTempP = $('<p>').text('Temperature: ' + jsonData.hours[0].airTemperature.noaa);
      let humidityP = $('<p>').text('Humidity: ' + jsonData.hours[0].humidity.noaa);
      let cloudP = $('<p>').text('Cloud Coverage: ' + jsonData.hours[0].cloudCover.noaa);
      let precipP = $('<p>').text('Precipitation: ' + jsonData.hours[0].precipitation.noaa);
      let windP = $('<p>').text('Wind Speed: ' + jsonData.hours[0].windSpeed.noaa);
        
      //let tempF = (jsonData.hours[0].airTemperature.noaa - 273.15) * 1.80 + 32;
      //let tempP = $('<p>').text('Temperature (C) ' + tempF.toFixed(2));
    
      div.append(cityEl, airTempP, humidityP, cloudP, precipP, windP, tempP);
    
      $('#main').html(div);
    });
  }
  function getTideInfo (place) {
    fetch(`${weatherURL}?lat=${place.geometry.location.lat()}&lng=${place.geometry.location.lng()}&params=${tideParams}`, {
      headers: {
        'Authorization': APIKey
      }
    }).then((response) => response.json()).then((jsonData) => {
      console.log(jsonData);
    });
  }
  function getMarineInfo (place) {
    fetch(`${weatherURL}?lat=${place.geometry.location.lat()}&lng=${place.geometry.location.lng()}&params=${marineParams}`, {
      headers: {
        'Authorization': APIKey
      }
    }).then((response) => response.json()).then((jsonData) => {
      console.log(jsonData);
    });
  }
  function getAstronmyInfo (place) {
    fetch(`${astronomyURL}?lat=${place.geometry.location.lat()}&lng=${place.geometry.location.lng()}&params=${astronomyParams}`, {
      headers: {
        'Authorization': APIKey
      }
    }).then((response) => response.json()).then((jsonData) => {
      console.log(jsonData);
    });
  }
});


let createCity = function(response, cityName) {
    
};
const time = undefined;

// tide info
const extremeTide = undefined;// look at example on api need lat and lng with params
const highTide = undefined;// look at example on api need lat and lng with params
const lowTide = undefined;// look at example on api need lat and lng with params

// todos after apis are set up

// dynamically append "set as favorite beach" button for dashboard when a result is selected by the user and displayed on dashboard
// make fav beach button add the beach data to the users table, column: fav_beach in sequelize
// if fav_beach data is not null: get its data and show it on dashboard at login

// show a loading gif while api is waiting its results (hidden in html)
