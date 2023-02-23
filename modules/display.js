async function displayData(currentResult, arrayOfDays, units) {
  document.querySelector('.weather-container').innerHTML = '';
  let currentWeatherContainer = document.createElement('div');
  currentWeatherContainer.classList.add('weather-panel', 'current');
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
    let spacerTop = document.createElement('div');
    spacerTop.style.gridColumnStart = '1';
    spacerTop.style.gridColumnEnd = '3';
    dayContainer.appendChild(spacerTop)
    for(let i = 0; i < day.length; i++){
      let intervalContainer = document.createElement('div');
      intervalContainer.classList.add('interval-container');
      dayContainer.appendChild(intervalContainer);
      let date = document.createElement('p');
      date.textContent = 'Date: ' + day[i].dt_txt;
      intervalContainer.appendChild(date);
      let tempMax = document.createElement('p');
      tempMax.classList.add('temperature');
      tempMax.textContent = 'Max temperature: ' + day[i].main.temp_max + units;
      intervalContainer.appendChild(tempMax);
      let tempMin = document.createElement('p');
      tempMin.classList.add('temperature');
      tempMin.textContent = 'Min temperature: ' + day[i].main.temp_min + units;
      intervalContainer.appendChild(tempMin);
      let weatherDesc = document.createElement('p');
      weatherDesc.textContent = 'Weather: ' + day[i].weather[0].description;
      intervalContainer.appendChild(weatherDesc);
      if(i % 2 == 0) {
       intervalContainer.style.gridColumnStart = '1';
       intervalContainer.style.gridColumnEnd = '2'; 
      } else {
        intervalContainer.style.gridColumnStart = '2';
        intervalContainer.style.gridColumnEnd = '3';
      }
    }
    document.querySelector('.weather-container').appendChild(dayContainer);
  }
}

export { displayData }