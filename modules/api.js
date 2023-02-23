import { getCountryCode, getStateCode } from './form.js'
import { displayData } from './display.js'
import { stateDropdown, countryDropdown, cityInput, celsiusBox, fahrenheitBox } from '../main.js'


async function getLocation(city, countryCode, stateCode) {
  if(countryCode == 'US') {
    try {
      let url = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},${stateCode},${countryCode}&limit=1&appid=6538885ee061064bc99332441ad15f2b`);
      let result = await url.json();
      return [result[0].lat, result[0].lon];
    } catch (err) {
      alert(err);
    };
  }else try {
      let url = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},${countryCode}&limit=1&appid=6538885ee061064bc99332441ad15f2b`);
      let result = await url.json();
      return [result[0].lat, result[0].lon];
    } catch (err) {
      alert(err);
    };
};

async function getCoords() {
  let city = cityInput.value;
  let country = await getCountryCode(countryDropdown.value);
  let state = await getStateCode(stateDropdown.value);
  return await getLocation(city, country, state);
}

function getIntervalsLeft (time) {
  let currentTime = new Date(time * 1000)
  return Math.floor((24 - currentTime.getHours()) / 3)
}


async function getWeatherData(coords) {
  try {
    let currentResult = '';
    let forecastResult = '';
    let units = '';
      if(celsiusBox.checked) {
      let currentUrl = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&units=metric&appid=6538885ee061064bc99332441ad15f2b`);
      currentResult = await currentUrl.json();
      let forecastUrl = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${coords[0]}&lon=${coords[1]}&units=metric&appid=6538885ee061064bc99332441ad15f2b`);
      forecastResult = await forecastUrl.json();
      units = 'C';
    } else if (fahrenheitBox.checked) {
      let currentUrl = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&units=imperial&appid=6538885ee061064bc99332441ad15f2b`);
      currentResult = await currentUrl.json();
      let forecastUrl = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${coords[0]}&lon=${coords[1]}&units=imperial&appid=6538885ee061064bc99332441ad15f2b`);
      forecastResult = await forecastUrl.json();
      units = 'F';
    }
    let intervalsLeft = getIntervalsLeft(currentResult.dt);
    let arrayOfDays = [[],[],[]];
    let a = 0;
    for(let i = intervalsLeft; i < (40-8-intervalsLeft); i+=8){
        arrayOfDays[a] = forecastResult.list.slice(i, i+8);
        a += 1;
    }
    displayData(currentResult, arrayOfDays, units)
  } catch (err) {
    console.log('error');
  }
}

export { getLocation, getCoords, getWeatherData }
