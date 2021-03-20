// access sequelize server api

// access magic seaweed api

// put data on page for usersinfo_db (name, and input *favorite beach info* *if selected*)

// query magic seaweed api with *favorite beach info* then put it on the the page

// give link to live cams from magic seaweed(not open by default for better page loading)
// if there are not cams for this beach display *no beach cams at this time*

// buttons
// popanimations



// This is our API key
const APIKey = "8e9f917c-8817-11eb-a9f7-0242ac130002-8e9f921c-8817-11eb-a9f7-0242ac130002";

// Here we are building the URL we need to query the database
const baseQueryURL = "https://api.stormglass.io/v2/";

//weather
const weatherURL = baseQueryURL + "weather/point";
//bio
const bioURL = baseQueryURL + "bio/point";
//tide
const extremePointURL = baseQueryURL + "tide/extremes/point";
const seaLevel = baseQueryURL + "tide/sea-level/point";
const stationsListURL = baseQueryURL + "tide/stations";
const stationsAreaURL = baseQueryURL + "stations/area";
//astronomy
const astronomyURL = baseQueryURL + "astronomy/point";
//solar
const solarURL = baseQueryURL + "solar/point";
//elevation
const elevationURL = baseQueryURL + "elevation/point";

//search for city/beach
const citiesSearched = [];


const createCity = function(response) {}

const time

//weahter info
const airTemperature //in degrees celsius - can convert to F
const humidity
const cloudCover
const precipitation
const windSpeed

//tide info
const extremeTide //look at example on api need lat and lng with params
const lowTide //look at example on api need lat and lng with params
const lowTide //look at example on api need lat and lng with params
const currentSpeed
const currentDirection

//marine weather
const waveHeight
const swellHeight
const swellDirection
const swellPeriod
const waterTemperature

//astronmy info
const sunrise
const sunset
const moonrise
const moonset
const moonPhase



// Here we run our AJAX call to the API
$.ajax({
  url: baseQueryURL,
  method: "GET"
})


//
  // We store all of the retrieved data inside of an object called "response"
  .then(function(response) {

    // Log the queryURL
    console.log(queryURL);

    // Log the resulting object
    console.log(response);

    // Transfer content to HTML
    $(".tide").text("<h1>" + response.name + " Weather Details</h1>");
    $(".wind").text("Wind Speed: " + response.wind.speed);
    $(".humidity").text("Humidity: " + response.main.humidity);
    
    // Convert the temp to fahrenheit
    var tempF = (response.main.temp - 273.15) * 1.80 + 32;

    // add temp content to html
    $(".temp").text("Temperature (K) " + response.main.temp);
    $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

    // Log the data in the console as well
    console.log("Wind Speed: " + response.wind.speed);
    console.log("Humidity: " + response.main.humidity);
    console.log("Temperature (F): " + tempF);
  });
