document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'YOUR_OPEN_WEATHER_API_KEY';
    const searchBtn = document.getElementById('search-btn');
    const locationInput = document.getElementById('location-input');
    const locationElem = document.getElementById('location');
    const dateTimeElem = document.getElementById('date-time');
    const temperatureElem = document.getElementById('temperature');
    const weatherDescriptionElem = document.getElementById('weather-description');
    const humidityElem = document.getElementById('humidity');
    const windSpeedElem = document.getElementById('wind-speed');
    const themeToggleBtn = document.getElementById('theme-toggle');

    searchBtn.addEventListener('click', () => {
        const location = locationInput.value;
        if (location) {
            fetchWeatherData(location);
        }
    });

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    async function fetchWeatherData(location) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
            const data = await response.json();
            if (response.ok) {
                updateUI(data);
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert('An error occurred while fetching the weather data.');
        }
    }

    function updateUI(data) {
        const date = new Date();
        locationElem.textContent = `${data.name}, ${data.sys.country}`;
        dateTimeElem.textContent = date.toLocaleString();
        temperatureElem.textContent = `Temperature: ${data.main.temp} °C`;
        weatherDescriptionElem.textContent = `Weather: ${data.weather[0].description}`;
        humidityElem.textContent = `Humidity: ${data.main.humidity} %`;
        windSpeedElem.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    }
});
