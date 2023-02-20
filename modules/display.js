async function displayData(currentResult, arrayOfDays, units) {
  document.querySelector('.weather-container').innerHTML = '';
  let currentWeatherContainer = document.createElement('div');
  currentWeatherContainer.classList.add('weather-panel');
  let currentTemp = document.createElement('p');
  currentTemp.classList.add('temperature');
  currentTemp.textContent = 'Current temperature: ' + currentResult.main.temp + units;
  currentWeatherContainer.appendChild(currentTemp);
  let currentWeatherDesc = document.createElement('p');
  currentWeatherDesc.textContent = 'Current weather: ' + currentResult.weather[0].description;
  currentWeatherContainer.appendChild(currentWeatherDesc);
  document.querySelector('.weather-container').appendChild(currentWeatherContainer);
  for(let day of arrayOfDays){
    let dayContainer = document.createElement('div');
    dayContainer.classList.add('weather-panel');
    for(let interval of day){
      let date = document.createElement('p');
      date.textContent = 'Date: ' + interval.dt_txt;
      dayContainer.appendChild(date);
      let tempMax = document.createElement('p');
      tempMax.classList.add('temperature');
      tempMax.textContent = 'Max temperature: ' + interval.main.temp_max + units;
      dayContainer.appendChild(tempMax);
      let tempMin = document.createElement('p');
      tempMin.classList.add('temperature');
      tempMin.textContent = 'Min temperature: ' + interval.main.temp_min + units;
      dayContainer.appendChild(tempMin);
      let weatherDesc = document.createElement('p');
      weatherDesc.textContent = 'Weather: ' + interval.weather[0].description;
      dayContainer.appendChild(weatherDesc);
    }
    document.querySelector('.weather-container').appendChild(dayContainer);
  }
}

export { displayData }