import './style.css'
//6538885ee061064bc99332441ad15f2b

async function getLocation(city, countryCode, stateCode) {
  console.log(countryCode)
  if(countryCode == 'US') {
    try {
      let url = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${stateCode},${countryCode}&limit=1&appid=6538885ee061064bc99332441ad15f2b`);
      let result = await url.json();
      console.log([result[0].lat, result[0].lon]);
      return [result[0].lat, result[0].lon];
    } catch (err) {
      alert(err);
    };
  }else try {
      let url = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${countryCode}&limit=1&appid=6538885ee061064bc99332441ad15f2b`);
      let result = await url.json();
      console.log([result[0].lat, result[0].lon]);
      return [result[0].lat, result[0].lon];
    } catch (err) {
      alert(err);
    };
};