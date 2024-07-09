const search = document.getElementById('searchBox');
const searchBtn = document.getElementById('searchBtn');
const savedCities = document.getElementsByClassName('savedCities');
const currentCity = document.getElementsByClassName('currentCity');
const forecastCards = document.getElementsByClassName('forecastCards');

function readWeatherFromStorage() {
    let cities = JSON.parse(localStorage.getItem('cities'));

    if (!cities) {
        cities = [];
    }

    return cities;
}

function saveWeatherToStorage(cities) {
    localStorage.setItem('cities', JSON.stringify(cities));
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
       
        }
      )};


      function displayWeather() {
        const cities = readWeatherFromStorage();
        for (let i = 0; i < cities.length; i++) {
            const city = cities[i];
            const cityEl = document.createElement('button');
            cityEl.textContent = city;
            // cityEl.classList.add('savedCities');
            savedCities.appendChild(cityEl);
        }
    }
      searchBtn.addEventListener("click", getApi);