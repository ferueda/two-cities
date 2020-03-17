const cityOneInput = document.getElementById('city-one');
const cityTwoInput = document.getElementById('city-two');
const cityOneContainer = document.getElementById('city-one-container');
const cityTwoContainer = document.getElementById('city-Two-container');
const cityOneSuggestions = document.getElementById('city-one-suggestions');
const cityTwoSuggestions = document.getElementById('city-two-suggestions');
const arrowBtn = document.getElementById('arrow');

const searchBtn = document.getElementById('search-btn');

let cities = [];

// gets cities data
async function getData() {
  const res = await fetch('world-cities_json.json');
  const data = await res.json();
  cities = data;
}

// returns city based on the input element
function filterCities(input) {
  return cities.filter(
    city =>
      city['name'].toLowerCase().startsWith(input) ||
      city['country'].toLowerCase().includes(input)
  );
}

// city one listeners
cityOneInput.addEventListener('input', e => {
  const input = cityOneInput.value.toLowerCase();
  let filteredCities = filterCities(input);

  cityOneSuggestions.innerHTML = '';

  filteredCities.slice(0, 10).forEach(city => {
    const cityEl = document.createElement('div');
    cityEl.innerHTML = `${city['name']}, ${city.country}`;
    cityOneSuggestions.appendChild(cityEl);
  });

  if (input === '') {
    cityOneSuggestions.innerHTML = '';
  }
});

cityOneSuggestions.addEventListener('click', e => {
  cityOneInput.value = e.target.textContent;
  cityOneSuggestions.innerHTML = '';
});

// city two listeners

cityTwoInput.addEventListener('input', () => {
  const input = cityTwoInput.value.toLowerCase();
  let filteredCities = filterCities(input);

  cityTwoSuggestions.innerHTML = '';

  filteredCities.slice(0, 10).forEach(city => {
    const cityEl = document.createElement('div');
    cityEl.innerHTML = `${city['name']}, ${city.country}`;
    cityTwoSuggestions.appendChild(cityEl);
  });

  if (input === '') {
    cityTwoSuggestions.innerHTML = '';
  }
});

cityTwoSuggestions.addEventListener('click', e => {
  cityTwoInput.value = e.target.textContent;
  cityTwoSuggestions.innerHTML = '';
});

// swap button functions

let rotated = false;

arrowBtn.addEventListener('click', () => {
  arrowBtn.style.transform = rotated ? 'rotate(0deg)' : 'rotate(180deg)';
  rotated = !rotated;
  [cityOneInput.value, cityTwoInput.value] = [
    cityTwoInput.value,
    cityOneInput.value
  ];
});

getData();

// CURRENCY CARD CODE
const currencyCard = document.getElementById('currency-card');

const cityOneCurrency = document.getElementById('city-one-curr');
const cityTwoCurrency = document.getElementById('city-two-curr');
const dateEl = document.getElementById('date');

const cityOneCurrencyLabel = document.getElementById('city-one-curr_label');
const cityTwoCurrencyLabel = document.getElementById('city-two-curr_label');

const cityOneValue = document.getElementById('city-one-value');
const cityTwoValue = document.getElementById('city-two-value');

let globalRate;

// search btn listener
searchBtn.addEventListener('click', async () => {
  let countryOne = cityOneInput.value.split(',');
  countryOne = countryOne[countryOne.length - 1].trim();
  let countryTwo = cityTwoInput.value.split(',');
  countryTwo = countryTwo[countryTwo.length - 1].trim();

  const countryOneData = await getCountryData(countryOne);
  const countryTwoData = await getCountryData(countryTwo);

  const rate = await getExchangeRate(
    countryOneData.currencies[0].code,
    countryTwoData.currencies[0].code
  );

  globalRate = rate;

  // currencies names and codes
  cityOneCurrency.textContent = `${countryOneData.currencies[0].name} (${countryOneData.currencies[0].code})`;
  cityTwoCurrency.textContent = `${rate.toFixed(2)} ${
    countryTwoData.currencies[0].name
  } (${countryTwoData.currencies[0].code})`;

  // currencies labels
  cityOneCurrencyLabel.textContent = `${countryOneData.currencies[0].code}`;
  cityTwoCurrencyLabel.textContent = `${countryTwoData.currencies[0].code}`;

  const date = new Date();

  const months = {
    '0': 'Jan',
    '1': 'Feb',
    '2': 'Mar',
    '3': 'Apr',
    '4': 'May',
    '5': 'Jun',
    '6': 'Jul',
    '7': 'Aug',
    '8': 'Sep',
    '9': 'Oct',
    '10': 'Nov',
    '11': 'Dec'
  };

  // date element
  dateEl.textContent = `${
    months[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()} - ${date.getHours()}:${
    date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`
  }`;

  // currencies input
  cityOneValue.value = (1).toFixed(2);
  cityTwoValue.value = (1 * rate).toFixed(2);

  currencyCard.style.display = 'flex';
});

function updateCurrencyInput(e) {
  if (e.target.id === 'city-one-value') {
    cityTwoValue.value = formatMoney(e.target.value * globalRate);
  } else if (e.target.id === 'city-two-value') {
    cityOneValue.value = formatMoney(e.target.value / globalRate);
  }
  e.target.value = formatMoney(Number(e.target.value));
}

// formats money
function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

cityOneValue.addEventListener('change', updateCurrencyInput);
cityTwoValue.addEventListener('change', updateCurrencyInput);

async function getCountryData(country) {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  if (res.status === 200) {
    const data = await res.json();
    return data.find(obj => obj.name === country || obj.nativeName === country);
  } else {
    throw new Error('Unable to fetch data');
  }
}

async function getExchangeRate(base, target) {
  const res = await fetch(
    `https://openexchangerates.org/api/latest.json?app_id=50b9e063716540c3b23c99c33e83bbb2&base=USD`
  );
  const data = await res.json();
  return data.rates[target] / data.rates[base];
}
