const countryOne = document.getElementById('city-one');
const countryTwo = document.getElementById('city-two');

const currencyOneValue = document.getElementById('curr-one-value');
const currencyTwoValue = document.getElementById('curr-two-value');

const currencyOneCode = document.getElementById('curr-one-code');
const currencyTwoCode = document.getElementById('curr-two-code');

const swapBtn = document.getElementById('swap');

function calculateOne() {
  fetch(`https://restcountries.eu/rest/v2/name/${countryOne.value}?fullText=true`)
    .then(res => res.json())
    .then(data => currencyOneCode.innerText = data[0]['currencies'][0]['code']);

}

function calculateTwo() {
  fetch(`https://restcountries.eu/rest/v2/name/${countryTwo.value}?fullText=true`)
    .then(res => res.json())
    .then(data => currencyTwoCode.innerText = data[0]['currencies'][0]['code']);

}

function calculateRate() {
  
}

countryOne.addEventListener('change', calculateOne);
countryTwo.addEventListener('change', calculateTwo);

calculateOne();
calculateTwo();