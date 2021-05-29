function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  city = city.trim().toLowerCase();

  searchCity(city);
}
function searchCity(city) {
  let cityName = city;

  let apiKey = "c52c31c9de81c33377732c839e055127";
  let endPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "imperial";
  let apiUrl = `${endPoint}q=${cityName}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return `${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let returnedCity = response.data.name;
  let humid = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let date = response.data.dt * 1000;

  let todayTemp = document.querySelector("#today-temp-digits");
  todayTemp.innerHTML = currentTemp;

  let todayDescrip = document.querySelector(".today-descrip");
  todayDescrip.innerHTML = description;

  let cityText = document.querySelector("#city-display");
  cityText.innerHTML = returnedCity;

  let todayHumidity = document.querySelector("#today-humid");
  todayHumidity.innerHTML = humid;

  let todayWind = document.querySelector("#today-wind");
  todayWind.innerHTML = wind;

  let dateDisplay = document.querySelector("#current-date");
  dateDisplay.innerHTML = formatDate(date);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}

function findLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;

  let apiKey = "c52c31c9de81c33377732c839e055127";
  let endPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "imperial";
  let apiUrl = `${endPoint}lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function tempToF(event) {
  event.preventDefault();
  let newTemp = document.querySelector("#today-temp-digits");
  newTemp.innerHTML = "66 ";
}

function tempToC(event) {
  event.preventDefault();
  let newTemp = document.querySelector("#today-temp-digits");
  newTemp.innerHTML = "19 ";
}

let inputCity = document.querySelector("#city-form");
inputCity.addEventListener("submit", handleSubmit);

let clickSearch = document.querySelector("#button-addon2");
clickSearch.addEventListener("click", handleSubmit);

let convertF = document.querySelector("#temp-f");
convertF.addEventListener("click", tempToF);

let convertC = document.querySelector("#temp-c");
convertC.addEventListener("click", tempToC);

let currentLocation = document.querySelector("#location");
currentLocation.addEventListener("click", getLocation);

searchCity("New York");
