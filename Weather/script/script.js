document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityname = document.querySelector('#city_name').value;

    if (!cityname) {
        return alert('Você precisa digitar uma cidade...');
    }

    const apikey = 'bb9e781a5b473d9bb523aa6ca98c2153';
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityname)}&appid=${apikey}&units=metric&lang=pt_br`;

    try {
        const results = await fetch(apiurl);
        const json = await results.json();

        if (json.cod === 200) {
            showInfo({
                city: json.name, 
                country: json.sys.country,
                temp: json.main.temp,
                tempMax: json.main.temp_max,
                tempMin: json.main.temp_min,
                description: json.weather[0].description, 
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                humidity: json.main.humidity,
            });
        } else {
            showAlert('Não foi possível localizar a cidade.');
        }
    } catch (error) {
        showAlert('Erro ao tentar obter os dados. Por favor, tente novamente.');
    }
});

function showInfo(json) {
    showAlert('');

    document.querySelector('#weather').classList.add('show');

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;
    document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>°C</sup>`;
    document.querySelector('#temp_description').innerHTML = json.description;
    document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>°C</sup>`;
    document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>°C</sup>`;
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`;
    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)} km/h`;
}

function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
    document.querySelector('#alert').style.display = msg ? 'block' : 'none';
}
