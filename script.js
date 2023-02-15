const form = document.querySelector('form');
const submitBtn = document.querySelector('.submit_btn');
const currentWeatherElements = document.querySelector('.current-weather-items');

const API_KEY = "7190c32451038b283eec8d6416110940";

form.addEventListener('submit', e => {
    e.preventDefault();

    const input = document.querySelector('input[type="text"]');
    callByCityName(input.value);
});


async function callByCityName(location) {

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&&units=metric&appid=${API_KEY}`, {mode: 'cors'});
        const data = await response.json();
        console.log(data);
        displayWeatherData(data);

    } catch(err) {
        console.log(err);
    }
}

function displayWeatherData(data) {

    //store the data to display in dom
    let {temp, feels_like, humidity, temp_max, temp_min, pressure} = data.main;
    
    // store user input and parse non needed format
    let name = data.name;
    if ((name.split(' ')).length > 2) {
        name = data.name.split(' ')[2];
    }

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
    `;
}