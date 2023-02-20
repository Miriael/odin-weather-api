import './style.css'
import { getAllCountries, getAllUSStates, showError } from './modules/form.js'
import { getCoords, getWeatherData } from './modules/api.js'

export const stateDropdown = document.querySelector('#state');
export const countryDropdown = document.querySelector('#country');
export const cityInput = document.querySelector('#city');
export const cityError = document.querySelector('.error');
const submitButton = document.querySelector('.submit-button');
export const celsiusBox = document.querySelector('#celsius');
export const fahrenheitBox = document.querySelector('#fahrenheit');

document.querySelector('.forecast-form').addEventListener('submit', (e) => {e.preventDefault()});

getAllCountries()
getAllUSStates()

countryDropdown.addEventListener('input', () => {
  console.log(countryDropdown.value)
  if(countryDropdown.value === 'United States of America'){
    stateDropdown.style['visibility'] = 'visible';
    document.querySelector('.state-label').style['visibility'] = 'visible';
  }else {
    stateDropdown.style['visibility'] = 'hidden';
    document.querySelector('.state-label').style['visibility'] = 'hidden';
  }
})

cityInput.addEventListener("input", (event) => {
  if (cityInput.validity.valid) {
    cityError.textContent = "";
    cityError.className = "error";
    cityInput.style['border'] = '1px solid rgb(0, 123, 238)'
  } else {
    showError();
  }
});

submitButton.addEventListener('click', async () => {
  if(cityInput.validity.valid){
    getWeatherData(await getCoords());
  } else{
    showError();
  }
})

