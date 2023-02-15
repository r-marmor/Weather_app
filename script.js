const form = document.querySelector('form');
const submitBtn = document.querySelector('.submit_btn');
const currentWeatherElements = document.querySelector('.current-weather-items');
const input = document.querySelector('input');
const errorMsg = document.querySelector('.error-msg');
const clockEl = document.querySelector('.clock');
const dateEl = document.querySelector('.date');

const API_KEY = "7190c32451038b283eec8d6416110940";

form.addEventListener('submit', e => {
    e.preventDefault();

    callByCityName(input.value);
});


async function callByCityName(location) {

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&&units=metric&lang=fr&appid=${API_KEY}`, {mode: 'cors'});
        const data = await response.json();
        errorMsg.style.display = "";
        displayWeatherData(data);
    } catch(err) {
          errorMsg.style.display = "block";
    }
}

function displayWeatherData(data) {

    //store the data to display in dom
    const {temp, feels_like, humidity, temp_max, temp_min, pressure} = data.main;
    
    // store user input and parse non needed format
    let name = data.name;
    if ((name.split(' ')).length > 2) {
        name = data.name.split(' ')[2];
    }

    const weather = data.weather[0].description;

    const wind = Math.round((data.wind.speed)*3.6);

    const sunriseTime = data.sys.sunrise;
    const sunsetTime = data.sys.sunset;

    //display in DOM
    currentWeatherElements.innerHTML =
    `
    <div class="weather-item-title">
         <h1>${name}</h1>
    </div>
    <div class="weather-item-temp">
        <h3>${Math.round(temp)}°</h3>
        <p> ( min: ${Math.round(temp_min)}° / max: ${Math.round(temp_max)}° )</p>
    </div>
    <div class="weather-item">
        <h4>Humidité :</h4>
        <p>${humidity}%</p>
    </div>
    <div class="weather-item">
        <h4>Ressenti :</h4>
        <p>${Math.round(feels_like)}°</p>
     </div>
     <div class="weather-item">
        <h4>Pression :</h4>
        <p>${pressure} hPa</p>
    </div>
    <div class="weather-item">
        <h4>Temps :</h4>
        <p>${weather}</p>
    </div>
    <div class="weather-item">
        <h4>Vent :</h4>
        <p>${wind} km/h</p>
    </div>
    `;
}

const days = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
const months = ["Janvier", "février", "mars", "avri", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];


function clock() {
    setInterval( () => {
        const time = new Date();
        const month = time.getMonth();
        const date = time.getDate();
        const day = time.getDay();
        const hour = time.getHours();
        const minutes = time.getMinutes();
        const formatMinutes = (minutes < 10) ? ('0' + minutes) : minutes;

        
        clockEl.innerHTML = hour + ':' + formatMinutes;
        dateEl.innerHTML = days[day] + ' ' +  date + ' ' + months[month];
    }, 1000);
}

clock();

console.log(new Date());