import './style.css'
//6538885ee061064bc99332441ad15f2b

const countryCodes = await (await fetch('./public/world.json')).json();
const stateCodes = await (await fetch('./public/subdivisions.json')).json();

function getAllCountries(){
  for(let element of countryCodes) {
    return(element.name)
  }
}

function getAllUSStates(){
  for(let element of stateCodes) {
    if(element.country === 'US') {
      return(element.name)
    }
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
  console.log(countryCode)
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

async function getWeatherData(coords) {
  try {
    let url = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&units=metric&appid=6538885ee061064bc99332441ad15f2b`);
    let result = await url.json();
    return result.main.temp;
  } catch (err) {
    console.log('error');
  }
}
