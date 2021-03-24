/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// require('dotenv').config();

// console.log(process.env);

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
  // const APIKey = process.env.API_KEY;
  // console.log(apiKey);

  //   // Here we are building the URL we need to query the database
  const baseQueryURL = 'https://api.stormglass.io/v2/';

  // weather
  const weatherURL = baseQueryURL + 'weather/point';

  //   // tide
  const extremePointURL = baseQueryURL + 'tide/extremes/point';

  // astronomy
  const astronomyURL = baseQueryURL + 'astronomy/point';

  const weatherParams = 'airTemperature,humidity,cloudCover,precipitation,windSpeed,currentSpeed,currentDirection,waveHeight,swellHeight,swellDirection,swellPeriod,waterTemperature';
  const astronomyParams = 'sunrise,sunset,moonrise,moonset,moonPhase';

  $('#saveFavBeach').change(function (event) {
    event.preventDefault();
    const searchText = $('#searchText').val();
    if (this.checked) {
      console.log('checked?');
      const favBeach = {
        fav_beach: searchText
      };
      console.log(favBeach);
      $.ajax({
        url: '/api/dashboard',
        method: 'POST',
        data: favBeach
      }).then(response => {
        console.log(response);
      });
    };
  });

  // load fav_beach
  function loadFavBeach () {
    $.ajax({
      url: '/api/dashboard',
      method: 'GET'
    }).then(response => {
      console.log(response);
      if (response.fav_beach) {
        favBeachButton = $('<button>');
        favBeachButton.text(response.fav_beach);
        favBeachButton.attr('value', response.fav_beach);
        favBeachButton.attr('id', 'favButton');
        $('#favBeach').append(favBeachButton);
      }
    });
  }

  loadFavBeach();
  // save searches -----need help here
  function saveBeachSearch () {
    const searchText = $('#searchText').val().trim();

    let storedBeaches = JSON.parse(localStorage.getItem('#storedBeachSearches'));

    if (storedBeaches === null) {
      storedBeaches = [];
    } else if (!searchText) {
      return;
    } else if (storedBeaches.includes(searchText)) {
      return;
    }
    storedBeaches.push(searchText);
    localStorage.setItem('#storedBeachSearches', JSON.stringify(storedBeaches));
    searchText.value = [''];
  }

  // search for city/beach
  $('#search').on('click', function (event) {
    event.preventDefault();
    const searchText = $('#searchText').val().trim();
    const favBeach = {
      fav_beach: searchText
    };
    console.log(searchText);
    $.ajax({
      url: '/api/dashboard',
      method: 'POST',
      data: favBeach
    }).then(response => {
      console.log(response);
    });

    // $('#main').empty();
    // $('#searchResults').empty();
    saveBeachSearch();

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
      const cityEl = $('<h3>').text(place.name + '(' + new Date().toLocaleDateString('en-US') + ')');
      const airTempP = $('<li>').text('Temperature: ' + jsonData.hours[0].airTemperature.noaa);
      const humidityP = $('<li>').text('Humidity: ' + jsonData.hours[0].humidity.noaa);
      const cloudP = $('<li>').text('Cloud Coverage: ' + jsonData.hours[0].cloudCover.noaa);
      const precipP = $('<li>').text('Precipitation: ' + jsonData.hours[0].precipitation.noaa);
      const windP = $('<li>').text('Wind Speed: ' + jsonData.hours[0].windSpeed.noaa);
      const currSpeedsP = $('<li>').text('Current Speeds: ' + jsonData.hours[0].currentSpeed.meto);
      const currDirectionP = $('<li>').text('Current Direction: ' + jsonData.hours[0].currentDirection.meto);

      const waveHeightP = $('<li>').text('Wave Height: ' + jsonData.hours[0].waveHeight.noaa);
      const swellHeightP = $('<li>').text('Swell Height: ' + jsonData.hours[0].swellHeight.noaa);
      const swellDirectionP = $('<li>').text('Swell Direction: ' + jsonData.hours[0].swellDirection.noaa);
      const swellPeriodP = $('<li>').text('Swell Period: ' + jsonData.hours[0].swellPeriod.noaa);
      const waterTempP = $('<li>').text('Water Temperature: ' + jsonData.hours[0].waterTemperature.noaa);

      // let tempF = (jsonData.hours[0].airTemperature.noaa - 273.15) * 1.80 + 32;
      // let tempP = $('<p>').text('Temperature (C) ' + tempF.toFixed(2));

      $('#cityName').append(cityEl);
      $('#weather').append(airTempP, humidityP, cloudP, precipP, windP);
      $('#marine').append(waveHeightP, swellHeightP, swellDirectionP, swellPeriodP, waterTempP, currSpeedsP, currDirectionP);
    });
  };
  function getTideInfo (place) {
    fetch(`${extremePointURL}?lat=${place.geometry.location.lat()}&lng=${place.geometry.location.lng()}`, {
      headers: {
        'Authorization': APIKey
      }
    }).then((response) => response.json()).then((jsonData) => {
      console.log(jsonData);
      const firstLowP = $('<li>').text('First Low Tide: ' + getDateTimeFormat(jsonData.data[0].time));
      const firstHighP = $('<li>').text('First High Tide: ' + getDateTimeFormat(jsonData.data[1].time));
      const secondLowP = $('<li>').text('Second Low Tide: ' + getDateTimeFormat(jsonData.data[2].time));
      const secondHighP = $('<li>').text('Second High Tide: ' + getDateTimeFormat(jsonData.data[3].time));

      $('#tide').append(firstLowP, secondLowP, firstHighP, secondHighP);
    });
  };
  function getAstronmyInfo (place) {
    fetch(`${astronomyURL}?lat=${place.geometry.location.lat()}&lng=${place.geometry.location.lng()}&params=${astronomyParams}`, {
      headers: {
        'Authorization': APIKey
      }
    }).then((response) => response.json()).then((jsonData) => {
      const sunriseP = $('<li>').text('Sunrise: ' + getDateTimeFormat(jsonData.data[0].sunrise));
      const sunsetP = $('<li>').text('Sunset: ' + getDateTimeFormat(jsonData.data[0].sunset));
      const moonriseP = $('<li>').text('Moonrise: ' + getDateTimeFormat(jsonData.data[0].moonrise));
      const moonsetP = $('<li>').text('Moonset: ' + getDateTimeFormat(jsonData.data[0].moonset));
      const moonphaseP = $('<li>').text('Moon Phase: ' + jsonData.data[0].moonPhase.closest.text);

      $('#astronomy').append(sunriseP, sunsetP, moonriseP, moonsetP, moonphaseP);
    });
  };
});
function getDateTimeFormat (date) {
  const datetime = new Date(date);
  return new Intl.DateTimeFormat('default', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }).format(datetime);
};

// let createCity = function(response, cityName) {
// };

// todos after apis are set up

// dynamically append "set as favorite beach" button for dashboard when a result is selected by the user and displayed on dashboard
// make fav beach button add the beach data to the users table, column: fav_beach in sequelize
// if fav_beach data is not null: get its data and show it on dashboard at login

// show a loading gif while api is waiting its results (hidden in html)
