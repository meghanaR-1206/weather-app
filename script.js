const api_key = "f0bb9305ba584eb2ba1123350250601";
const input = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#search");
const locationDetails = document.querySelector("#location-details");
const container = document.querySelector("#weather-container");

const fetchData = async (city) => {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}&aqi=no`
        );
        const data = await response.json();
        console.log(data);

        
        container.innerHTML = '';

        const location_details = document.createElement('div');
        location_details.id = "location-details";

        const location = document.createElement('h2');
        location.textContent = data['location']['name'];

        const region = document.createElement('p');
        region.innerHTML = '<strong>Region:</strong> ' + data['location']['region'];

        const time = document.createElement('p');
        time.innerHTML = '<strong>Local Time:</strong> ' + data['location']['localtime'];

        location_details.append(location);
        location_details.append(region);
        location_details.append(time);

        container.append(location_details);

        const weather_details = document.createElement('div');
        weather_details.id = "weather-details";

        const condition = document.createElement('div');
        condition.className = "weather-condition"; 

        const cond = document.createElement('p');
        cond.innerHTML = '<strong>Condition:</strong> ' + data['current']['condition']['text'];

        const image = document.createElement('img');
        image.src = data['current']['condition']['icon'];

        const temp = document.createElement('p');
        temp.innerHTML = '<strong>Temperature:</strong> ' + `${data['current']['temp_c']}°C (feels like ${data['current']['feelslike_c']}°C)`;

        const wind = document.createElement('p');
        wind.innerHTML = `<strong>Wind:</strong> ${data['current']['wind_mph']}mps (Direction: ${data['current']['wind_dir']})`;

        const Pressure = document.createElement('p');
        Pressure.innerHTML = `<strong>Pressure:</strong> ${data['current']['pressure_mb']}mb`;

        const Humidity = document.createElement('p');
        Humidity.innerHTML = `<strong>Humidity:</strong> ${data['current']['humidity']}%`;

        const visibility = document.createElement('p');
        visibility.innerHTML = `<strong>Visibility:</strong> ${data['current']['vis_km']}km`;

        condition.append(cond);
        condition.append(image);

        weather_details.append(condition);
        weather_details.append(temp);
        weather_details.append(wind);
        weather_details.append(Pressure);
        weather_details.append(Humidity);
        weather_details.append(visibility);

        container.append(weather_details);

    } catch (error) {
        console.error('Error fetching data:', error);
        container.innerHTML = '<p>There was an error fetching the data.</p>';
    }
};

searchBtn.addEventListener("click", () => {
    const city = input.value.trim();
    console.log(city);
    if (city) {
        fetchData(city);
    }
});
