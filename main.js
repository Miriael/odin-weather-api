import './style.css'
//6538885ee061064bc99332441ad15f2b

const countryCodes = await (await fetch('/world.json')).json();
const stateCodes = await (await fetch('/subdivisions.json')).json();
const stateDropdown = document.querySelector('#state');
const countryDropdown = document.querySelector('#country');

countryDropdown.addEventListener('input', () => {
  console.log(countryDropdown.value)
  if(countryDropdown.value === 'United States of America'){
    stateDropdown.style['visibility'] = 'visible';
  }else {
    stateDropdown.style['visibility'] = 'hidden';
  }
})

function getAllCountries(){
  for(let element of countryCodes) {
    let country = document.createElement('option');
    country.innerHTML = element.name;
    country.setAttribute('value', element.name);
    countryDropdown.appendChild(country);
  }
}

function getAllUSStates(){
  for(let element of stateCodes.filter((a) => {if(a.country != 'US'){return false}return true})) {
    let state = document.createElement('option');
    state.innerHTML = element.name;
    state.setAttribute('value', element.name);
    stateDropdown.appendChild(state);
  }
}

getAllCountries()
getAllUSStates()

function getCountryCode(country) {
  return countryCodes.find((a) => {return a.name === country}).alpha2;
}

function getStateCode(state) {
  return stateCodes.find((a) => {return a.name === state}).code;
}

async function getLocation(city, countryCode, stateCode) {
  if(countryCode == 'US') {
    try {
      let url = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${stateCode},${countryCode}&limit=1&appid=6538885ee061064bc99332441ad15f2b`);
      let result = await url.json();
      return [result[0].lat, result[0].lon];
    } catch (err) {
      alert(err);
    };
  }else try {
      let url = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${countryCode}&limit=1&appid=6538885ee061064bc99332441ad15f2b`);
      let result = await url.json();
      return [result[0].lat, result[0].lon];
    } catch (err) {
      alert(err);
    };
};

const weatherpanel = document.querySelector('.weather-panel');

//Set up loop via index with steps of 2, and add weather data alternatingly between two divs in two columns via grid to fit maybe?

function populatePanels () {
    for(let i = 0; i < 8; i++){

    }
  }




async function getWeatherData(coords) {
  try {
    let url = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${coords[0]}&lon=${coords[1]}&units=metric&appid=6538885ee061064bc99332441ad15f2b`);
    let result = await url.json();
    console.log(result.list);
    let arrayOfDays = [[],[],[],[],[]];
    for(let i = 0; i < 5; i++){
      arrayOfDays[i] = result.list.slice(i, i+8);
    }
    for(let day of arrayOfDays){
      console.log(day);
      for(let interval of day){
        weatherpanel.innerHTML = weatherpanel.innerHTML + interval.dt_txt.slice(11, -1).slice(0, 5);
        console.log(interval.dt_txt.slice(11, -1).slice(0, 5));
        console.log(interval.main.temp_min);
        console.log(interval.main.temp_max);
        console.log(interval.weather[0].description);
      }
    }
    console.log(arrayOfDays);
  } catch (err) {
    console.log('error');
  }
}

//getWeatherData(await getLocation('London','GB'))