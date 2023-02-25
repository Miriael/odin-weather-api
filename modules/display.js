async function displayData(currentResult, arrayOfDays, units) {
  document.querySelector('.weather-container').innerHTML = '';
  document.querySelector('.current-weather-container').innerHTML = '';
  let currentWeatherContainer = document.createElement('div');
  currentWeatherContainer.classList.add('current');
  let currentTemp = document.createElement('p');
  currentTemp.classList.add('temperature');
  currentTemp.textContent = 'Current temperature: ' + currentResult.main.temp + units;
  currentWeatherContainer.appendChild(currentTemp);
  let currentWeatherDesc = document.createElement('p');
  currentWeatherDesc.textContent = 'Current weather: ' + currentResult.weather[0].description;
  currentWeatherContainer.appendChild(currentWeatherDesc);
  document.querySelector('.current-weather-container').appendChild(currentWeatherContainer);
  for(let day of arrayOfDays){
    let dayContainer = document.createElement('div');
    dayContainer.classList.add('weather-panel');
    let spacer1 = document.createElement('div');
    spacer1.style.gridColumnStart = '1';
    spacer1.style.gridColumnEnd = '4';
    dayContainer.appendChild(spacer1)
    let date = document.createElement('p');
    date.textContent = "Date: " + day[0].dt_txt.slice(0, 10);
    date.style.gridColumnStart = '1';
    date.style.gridColumnEnd = '4';
    date.style.gridRowStart = '2';
    date.style.gridRowEnd = '3';
    date.style.fontSize = '200%'
    dayContainer.appendChild(date);
    let spacer2 = document.createElement('div');
    spacer2.style.gridColumnStart = '1';
    spacer2.style.gridColumnEnd = '4';
    spacer2.style.gridRowStart = '3';
    spacer2.style.gridRowEnd = '4';
    dayContainer.appendChild(spacer2)
    let spacerMiddle = document.createElement('div')
    spacerMiddle.style.gridColumnStart = '2';
    spacerMiddle.style.gridColumnEnd = '3';
    spacerMiddle.style.gridRowStart = '4';
    spacerMiddle.style.gridRowEnd = '8';
    dayContainer.appendChild(spacerMiddle);
    for(let i = 0; i < day.length; i++){
      let intervalContainer = document.createElement('div');
      intervalContainer.classList.add('interval-container');
      dayContainer.appendChild(intervalContainer);
      let date = document.createElement('p');
      date.textContent = day[i].dt_txt.slice(11);
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
        intervalContainer.style.gridColumnStart = '3';
        intervalContainer.style.gridColumnEnd = '4';
      }
    }
    document.querySelector('.weather-container').appendChild(dayContainer);
  }
}

export { displayData }