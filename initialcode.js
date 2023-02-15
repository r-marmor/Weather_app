



// weatherApiCall();

// function weatherApiCall() {

//     navigator.geolocation.getCurrentPosition((success) => {
//         let {latitude, longitude} = success.coords;

//     fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`, {mode: 'cors'})
//     .then(response => response.json()).then(data => {
//         console.log(data);
//         showWeatherData(data);
//     });

//     });
// }


function clearElements(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function showWeatherData(data) {
    let {temp, feels_like, humidity, temp_max, temp_min} = data.main;
    let name = (data.name).split(' ')[2];
    
    currentWeatherElements.innerHTML =
    `
        <div class="weather-item-title">
            <h1>${name}</h1>
        </div>
        <div class="weather-item">
            <h3>Temp :</h3>
            <p>${Math.round(temp)}° ( ↓ ${Math.round(temp_min)}° / ↑ ${Math.round(temp_max)}° )</p>
        </div>
        <div class="weather-item">
            <h3>Humidité :</h3>
            <p>${humidity}%</p>
        </div>
        <div class="weather-item">
            <h3>Ressenti :</h3>
            <p>${Math.round(feels_like)}°</p>
        </div>
    `;

}