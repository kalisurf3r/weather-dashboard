const search = document.getElementById("searchBox");
const searchBtn = document.getElementById("searchBtn");
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
  cities.forEach(city => displayWeather(city));
}

function loadSavedCities() {
  let cities = JSON.parse(localStorage.getItem("cities")) || [];
}

function getApi(cityName) {
  const city = search.value;

  const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=9796cad7343053fbee41e3b5784a9a92`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //placing city name in the current city div
      displayWeather(data.city.name);
      //looping for 5 cards
      for (let i = 0; i < 5; i++) {
        displayWeatherStats(data.list[i], i); 
      }
      console.log(data.list[0].dt);
      loadSavedCities();
      
    });
}

function displayWeather(cityName) {
  
  createCityButton(cityName);
  
  let cities = JSON.parse(localStorage.getItem("cities")) || [];
  if (!cities.includes(cityName)) {
    cities.push(cityName);
    localStorage.setItem("cities", JSON.stringify(cities));
  }

  const currentCityName = document.querySelector(".cityName");
  currentCityName.textContent = cityName;

  
}

//creates a button for each city searched
function createCityButton(cityName) {
  
  const newButton = document.createElement("button");
 
  newButton.textContent = cityName;
 
  savedCities.appendChild(newButton);

  newButton.addEventListener("click", function () {
    
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=9796cad7343053fbee41e3b5784a9a92`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Display weather data for the clicked city
            displayWeather(cityName); // Update the city name
            displayWeatherStats(data); // Update weather data
        });
  });
}

function displayWeatherStats(data, index) {
  //time and date
  const unixTimestamp = data.dt;
    const date = new Date(unixTimestamp * 1000);
    const formattedDate = date.toLocaleString();

    const todaysDate = document.querySelectorAll(`.date-${index + 1}`);
    todaysDate.forEach((dataElement) => {
        dataElement.textContent = formattedDate;
    });
  
  //weather icon
  const iconElements = document.querySelectorAll(`.icon-${index + 1}`);
  const iconCode = data.weather[0].icon; 
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`; // icon URL
  iconElements.forEach((element) => {
    element.src = iconUrl; // Setting the src attribute of img elements to display the icon
  });

  //temp
  const temp = document.querySelectorAll(`.temp-${index + 1}`); 
  const tempInFahrenheit = ((data.main.temp - 273.15) * 9) / 5 + 32;
  temp.forEach((dataElement) => {
      dataElement.textContent = `${tempInFahrenheit.toFixed(2)} °F`;
  });

  //wind
  const wind = document.querySelectorAll(`.wind-${index + 1}`);
  wind.forEach(
    (dataElement) => (dataElement.textContent = `${data.wind.speed} MPH`)
  );

  //humidity
  const humidity = document.querySelectorAll(`.humidity-${index + 1}`);
  humidity.forEach(
    (dataElement) => (dataElement.textContent = `${data.main.humidity}%`)
  );
  
}

//event listeners
searchBtn.addEventListener("click", getApi);
//on page load 
document.addEventListener('DOMContentLoaded', (event) => {
  // Load saved cities from local storage on page load
  const cities = JSON.parse(localStorage.getItem('cities')) || [];
  cities.forEach(city => createCityButton(city));
  
});

