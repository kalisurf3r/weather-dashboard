const search = document.getElementById("searchBox");
const searchBtn = document.getElementById("searchBtn");
// const savedCities = document.getElementsByClassName('savedCities');
const savedCities = document.querySelector(".savedCities");

const currentCity = document.getElementsByClassName("currentCity");
const forecastCards = document.getElementsByClassName("forecastCards");

function readWeatherFromStorage() {
  let cities = JSON.parse(localStorage.getItem("cities"));

  if (!cities) {
    cities = [];
  }

  return cities;
}

function saveWeatherToStorage(cities) {
  localStorage.setItem("cities", JSON.stringify(cities));
}

function getApi() {
  const city = search.value;

  const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=9796cad7343053fbee41e3b5784a9a92`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayWeather(data.city.name);
      displayWeatherStats(data.list[0]);
      console.log(data.list[0].dt);
    });
}

function displayWeather(cityName) {
  // Step 1: Create a new button
  const newButton = document.createElement("button");

  // Step 2: Set button text
  newButton.textContent = cityName;

  // Step 3: Add button to the div
  savedCities.appendChild(newButton);

  // Step 4: Save to Local Storage
  let cities = JSON.parse(localStorage.getItem("cities")) || [];
  if (!cities.includes(cityName)) {
    cities.push(cityName);
    localStorage.setItem("cities", JSON.stringify(cities));
  }

  // step 5 add data to cards
  const currentCityName = document.querySelector(".cityName");
  currentCityName.textContent = cityName;
}

function displayWeatherStats(data) {
    // all for current city display
    //time and date
  const unixTimestamp = data.dt;
  const date = new Date(unixTimestamp * 1000);

  const formattedDate = date.toLocaleString();

  const todaysDate = document.querySelectorAll(".date1");
  todaysDate.forEach(dateElement => dateElement.textContent = formattedDate);
  
  //temp
  const temp = document.querySelectorAll(".temp1");
  const tempInFahrenheit = (data.main.temp - 273.15) * 9/5 + 32;
  temp.forEach(dataElement => dataElement.textContent = `${tempInFahrenheit.toFixed(2)} °F`);

  //wind
    const wind = document.querySelectorAll(".wind1");
    wind.forEach(dataElement => dataElement.textContent = `${data.wind.speed} MPH`);

    //humidity
    const humidity = document.querySelectorAll(".humidity1");
    humidity.forEach(dataElement => dataElement.textContent = `${data.main.humidity}%`);
}


function loadSavedCities() {
  let cities = JSON.parse(localStorage.getItem("cities")) || [];
  cities.forEach((cityName) => {
    const newButton = document.createElement("button");
    newButton.textContent = cityName;
    savedCities.appendChild(newButton);
  });
}

function loadCurrentCity() {
  let cities = JSON.parse(localStorage.getItem("cities")) || [];
}

searchBtn.addEventListener("click", getApi);

document.addEventListener("DOMContentLoaded", loadSavedCities);
