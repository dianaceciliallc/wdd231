const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionElement = document.querySelector('figcaption');
const forecastContainer = document.querySelector('#forecast-container');

const key = "68c5cf0fc94e7ab3df69dc10558fbe40";
const lat = "49.73547674941001";
const lon = "6.64152044363003";

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;

async function apiFetch() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayCurrentResults(data);
        } else {
            throw Error(await responseCurrent.text());
        }

        const responseForecast = await fetch(forecastUrl);
        if (responseForecast.ok) {
            const dataForecast = await responseForecast.json();
            displayForecastResults(dataForecast);
        } else {
            throw Error(await responseForecast.text());
        }

    } catch (error) {
        console.log("Error fetching weather:", error);
    }
}

apiFetch();

function displayCurrentResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;C`;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    let desc = data.weather[0].description;

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    
    if (captionElement) {
        captionElement.textContent = desc;
    }
}

function displayForecastResults(data) {
    if (!forecastContainer) return;
    forecastContainer.innerHTML = "";

    const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    dailyForecasts.forEach(day => {
        const date = new Date(day.dt * 1000);
        const options = { weekday: 'short' };
        const dayName = date.toLocaleDateString('en-US', options);

        const temp = Math.round(day.main.temp);
        const iconCode = day.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const forecastDayDiv = document.createElement("div");
        forecastDayDiv.className = "forecast-day";
        forecastDayDiv.innerHTML = `
            <p class="forecast-weekday">${dayName}</p>
            <img src="${iconUrl}" alt="${day.weather[0].description}">
            <p class="forecast-temp">${temp}&deg;C</p>
        `;

        forecastContainer.appendChild(forecastDayDiv);
    });
}