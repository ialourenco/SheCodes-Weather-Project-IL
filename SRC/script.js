//Date

let now = new Date();

let today = document.querySelector("span.day");
let currentHour = document.querySelector("#currentHour");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

today.innerHTML = `${day} ${month} ${date}, ${year}`;
currentHour.innerHTML = `${hours}:${minutes}`;

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

//SEARCH

function getCity(event) {
  event.preventDefault();
  let input = document.querySelector("#cities");
  let currentCity = document.querySelector("#curCity");
  let city = document.querySelector("#cities").value;
  searchCityWeather(city);

  if (input.value) {
    currentCity.innerHTML = `${input.value[0].toUpperCase()}${input.value.slice(
      1
    )}`;
  } else {
    currentCity.innerHTML = null;
    alert("Please type a city");
  }
}
let form = document.querySelector("form");
form.addEventListener("submit", getCity);

function searchCityWeather(city) {
  let apiKey = "e620de7a22846f175749c122cd894d03";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}
//Geolocation
function getLocation(location) {
  let apiKey = "e620de7a22846f175749c122cd894d03";
  let lat = location.coords.latitude;
  let long = location.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let findLocation = document.querySelector("#currentLoc");
findLocation.addEventListener("click", getCurrentLocation);

//Weather and other info
function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = null;
  console.log(response.data);

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h6>${formatHours(forecast.dt * 1000)}</h6>
      <img
        src="https://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
      <div class="weather-forecast-temperature">
        <strong>${Math.round(forecast.main.temp_max)}°</strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
}

function showWeather(response) {
  celsiusTemperature = response.data.main.temp;

  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = Math.round(celsiusTemperature);

  let maxTemp = document.querySelector("#maxTemperature");
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);

  let minTemp = document.querySelector("#minTemperature");
  minTemp.innerHTML = Math.round(response.data.main.temp_min);

  let description = document.querySelector("#weatherDescription");
  description.innerHTML = response.data.weather[0].description;

  let weatherIcon = document.querySelector("#weatherIcon");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed * 3.6);

  let realFeel = document.querySelector("#realFeel");
  realFeel.innerHTML = Math.round(response.data.main.feels_like);

  let nowCity = document.querySelector("#curCity");
  nowCity.innerHTML = response.data.name;
}

//changing Celcius/Farenhight
function changeCel(event) {
  event.preventDefault();
  celIcon.classList.add("active");
  farIcon.classList.remove("active");
  let tempC = document.querySelector("#currentTemp");
  tempC.innerHTML = Math.round(celsiusTemperature);
}
let celIcon = document.querySelector("#celsius");
celIcon.addEventListener("click", changeCel);

function changeFar(event) {
  event.preventDefault();
  celIcon.classList.remove("active");
  farIcon.classList.add("active");
  let tempF = document.querySelector("#currentTemp");
  tempF.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}
let farIcon = document.querySelector("#fahrenheit");
farIcon.addEventListener("click", changeFar);

let celsiusTemperature = null;

//Forecast
