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
  // save searches
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
        favBeachButton.attr('class', 'btn btn-primary');
        favBeachButton.attr('value', response.fav_beach);
        favBeachButton.attr('id', 'favButton');
        $('#favBeach').append(favBeachButton);
      }
      // favorite beach button
      $('#favBeach').on('click', function () {
        $('#cityName').empty();
        $('#weather').empty();
        $('#marine').empty();
        $('#astronomy').empty();
        $('#tide').empty();
        const searchText = $('#favButton').val();
        apiCall(searchText);
      });
    });
  }
  loadFavBeach();
  // render previous search
  function renderPreviousButton () {
    let storedBeaches = JSON.parse(localStorage.getItem('#storedBeachSearches'));
    $('#beachHistory').empty();
    if (storedBeaches === null) {
      storedBeaches = [];
    } else {
      for (let i = 0; i < storedBeaches.length; i++) {
        beachRow = $('<div>');
        beachRow.attr('class', 'row');
        beachButton = $('<button>');
        beachButton.text(storedBeaches[i]);
        beachButton.attr('class', 'btn btn-primary m-1');
        beachButton.attr('value', storedBeaches[i]);
        beachRow.append(beachButton);
        $('#beachHistory').prepend(beachRow);
      }
      $('.btn').on('click', function () {
        $('#cityName').empty();
        $('#weather').empty();
        $('#marine').empty();
        $('#astronomy').empty();
        $('#tide').empty();
        const searchText = $(this).val();
        apiCall(searchText);
      });
    }
  }
  // API and render info on screen
  async function apiCall (searchText) {
    let APIKey = await fetch('/api/key');
    APIKey = await APIKey.json();
    // This is our API key
    // const APIKey = '8e9f917c-8817-11eb-a9f7-0242ac130002-8e9f921c-8817-11eb-a9f7-0242ac130002';
    console.log(APIKey);

    // Here we are building the URL we need to query the database
    const baseQueryURL = 'https://api.stormglass.io/v2/';

    // weather
    const weatherURL = baseQueryURL + 'weather/point';

    //   // tide
    const extremePointURL = baseQueryURL + 'tide/extremes/point';

    // astronomy
    const astronomyURL = baseQueryURL + 'astronomy/point';

    const weatherParams = 'airTemperature,humidity,cloudCover,precipitation,windSpeed,currentSpeed,currentDirection,waveHeight,swellHeight,swellDirection,swellPeriod,waterTemperature';
    const astronomyParams = 'sunrise,sunset,moonrise,moonset,moonPhase';

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

    function getWeatherInfo (place) {
      fetch(`${weatherURL}?lat=${place.geometry.location.lat()}&lng=${place.geometry.location.lng()}&params=${weatherParams}`, {
        headers: {
          'Authorization': APIKey
        }
      }).then((response) => response.json()).then((jsonData) => {
        renderPreviousButton();
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
        $('#cityName').empty();
        $('#weather').empty();
        $('#marine').empty();
        $('#cityName').html(cityEl);

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
        $('#tide').empty();
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
        $('#astronomy').empty();
        $('#astronomy').append(sunriseP, sunsetP, moonriseP, moonsetP, moonphaseP);
      });
    };
  };
  function getDateTimeFormat (date) {
    const datetime = new Date(date);
    return new Intl.DateTimeFormat('default', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }).format(datetime);
  }

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

  renderPreviousButton();

  // search for city/beach
  $('#search').on('click', function (event) {
    event.preventDefault();
    $('#cityName').empty();
    $('#weather').empty();
    $('#marine').empty();
    $('#astronomy').empty();
    $('#tide').empty();
    const searchText = $('#searchText').val().trim();
    saveBeachSearch();
    apiCall(searchText);
  });
  $('#clear').on('click', function () {
    localStorage.clear('#storedBeachSearches');
    $('#beachHistory').empty();
  });
});
