import './style.css'
//6538885ee061064bc99332441ad15f2b

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
