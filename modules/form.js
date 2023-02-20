import { stateDropdown, countryDropdown, cityInput, cityError } from '../main.js'

const countryCodes = await (await fetch('/world.json')).json();
const stateCodes = await (await fetch('/subdivisions.json')).json();

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

function getCountryCode(country) {
  return countryCodes.find((a) => {return a.name === country}).alpha2;
}

function getStateCode(state) {
  return stateCodes.find((a) => {return a.name === state}).code;
}

function showError() {
  if (cityInput.validity.valueMissing) {
    cityError.textContent = "This field is required!";
    cityInput.style['border'] = '1px solid red'
  } else if (cityInput.validity.patternMismatch) {
    cityError.textContent = "Please enter a valid city.";
    cityInput.style['border'] = '1px solid red'
  } else {

  }
}

export { getAllCountries, getAllUSStates, getCountryCode, getStateCode, showError }