//Date

let now = new Date();
console.log(now);

let today = document.querySelector("span.day");
let currentHour = document.querySelector("#currentHour");
console.log(currentHour);

let date = now.getDate();
let hours = now.getHours();
console.log(hours);
let minutes = now.getMinutes();
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
}
//Geolocation
function getLocation(location) {
  let apiKey = "e620de7a22846f175749c122cd894d03";
  let lat = location.coords.latitude;
  let long = location.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let findLocation = document.querySelector("#currentLoc");
findLocation.addEventListener("click", getCurrentLocation);

//Weather and other info
function showWeather(response) {
  console.log(response.data);

  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = Math.round(response.data.main.temp);

  let maxTemp = document.querySelector("#maxTemperature");
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);

  let minTemp = document.querySelector("#minTemperature");
  minTemp.innerHTML = Math.round(response.data.main.temp_min);

  let description = document.querySelector("#weatherDescription");
  description.innerHTML = response.data.weather[0].description.toUpperCase();

  //let weatherIcon = document.querySelector("#weatherIcon");
  //weatherIcon.innerHTML = response.data.weather[0].icon;
  //console.log(weatherIcon);
  //src = `http://openweathermap.org/img/wn/${icon}.png)

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
  let tempC = document.querySelector("#currentTemp");
  tempC.innerHTML = `19`;
}
let celIcon = document.querySelector("#celsius");
celIcon.addEventListener("click", changeCel);

function changeFar(event) {
  event.preventDefault();
  let tempF = document.querySelector("#currentTemp");
  tempF.innerHTML = `66`;
}
let farIcon = document.querySelector("#fahrenheit");
farIcon.addEventListener("click", changeFar);
