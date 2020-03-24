const cityOneInput = document.getElementById('city-one');
const cityTwoInput = document.getElementById('city-two');
const cityOneContainer = document.getElementById('city-one-container');
const cityTwoContainer = document.getElementById('city-Two-container');
const cityOneSuggestions = document.getElementById('city-one-suggestions');
const cityTwoSuggestions = document.getElementById('city-two-suggestions');
const arrowBtn = document.getElementById('arrow');
const searchBtn = document.getElementById('search-btn');
const currencyCard = document.getElementById('currency-card');
const timeZonesCard = document.getElementById('time-zones-card');
const covidCard = document.getElementById('covid-card');

// city one input listeners
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

// city two input listeners

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

// swap button listener

let rotated = false;

arrowBtn.addEventListener('click', () => {
  arrowBtn.style.transform = rotated ? 'rotate(0deg)' : 'rotate(180deg)';
  rotated = !rotated;
  [cityOneInput.value, cityTwoInput.value] = [
    cityTwoInput.value,
    cityOneInput.value
  ];
});

// search btn listener
searchBtn.addEventListener('click', async () => {
  document.getElementById('card-container').style.display = 'flex';

  currencyCard.innerHTML = `
    <h2>Time Zones</h2>
    <p>Loading...</p>
  `;

  timeZonesCard.innerHTML = `
    <h2>Time Zones</h2>
    <p>Loading...</p>
  `;

  covidCard.innerHTML = `
    <h2>COVID-19 Info</h2>
    <p>Loading...</p>
  `;

  let countryOne = cityOneInput.value.split(',');
  countryOne = countryOne[countryOne.length - 1].trim();
  let countryTwo = cityTwoInput.value.split(',');
  countryTwo = countryTwo[countryTwo.length - 1].trim();

  const [countryOneData, countryTwoData] = await Promise.all([
    getCountryData(countryOne),
    getCountryData(countryTwo)
  ]);

  const rate = await getExchangeRate(
    countryOneData.currencies[0].code,
    countryTwoData.currencies[0].code
  );

  //assign data to global variables
  globalRate = rate;

  globalCountries['country one'] = countryOneData;
  globalCountries['country two'] = countryTwoData;

  globalCities['city one'] = cityOneInput.value.split(',')[0].trim();
  globalCities['city two'] = cityTwoInput.value.split(',')[0].trim();

  // display currencies name, code and rate values

  currencyCard.innerHTML = '<h2>Time Zones</h2>';

  const cityOneCurrency = document.createElement('p');
  cityOneCurrency.innerHTML = `<span class="city-one-curr">1 ${countryOneData.currencies[0].name} (${countryOneData.currencies[0].code})</span>`;
  currencyCard.appendChild(cityOneCurrency);

  const equals = document.createElement('span');
  equals.textContent = 'equals to';
  currencyCard.appendChild(equals);

  const cityTwoCurrency = document.createElement('p');
  cityTwoCurrency.innerHTML = `<span class="city-two-curr">${rate.toFixed(2)} ${
    countryTwoData.currencies[0].name
  } (${countryTwoData.currencies[0].code})</span>`;
  currencyCard.appendChild(cityTwoCurrency);

  // render date element

  const dateEl = document.createElement('span');
  dateEl.classList.add('card-currency_date');
  currencyCard.appendChild(dateEl);

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

  const date = new Date();

  // render date element
  dateEl.textContent = `${
    months[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()} - ${date.getHours()}:${
    date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`
  }`;

  // render currency labels and inputs
  const cityOneCurrencyLabel = document.createElement('label');
  const cityTwoCurrencyLabel = document.createElement('label');

  cityOneCurrencyLabel.setAttribute('for', 'city-one-curr');
  cityTwoCurrencyLabel.setAttribute('for', 'city-two-curr');

  cityOneCurrencyLabel.textContent = `${countryOneData.currencies[0].code}`;
  cityTwoCurrencyLabel.textContent = `${countryTwoData.currencies[0].code}`;

  const cityOneValue = document.createElement('input');
  const cityTwoValue = document.createElement('input');

  cityOneValue.setAttribute('type', 'text');
  cityOneValue.setAttribute('name', 'city-one-curr');

  cityTwoValue.setAttribute('type', 'text');
  cityTwoValue.setAttribute('name', 'city-two-curr');

  cityOneValue.addEventListener('change', updateCurrencyInput);
  cityTwoValue.addEventListener('change', updateCurrencyInput);

  cityOneValue.value = (1).toFixed(2);
  cityTwoValue.value = (1 * rate).toFixed(2);

  currencyCard.appendChild(cityOneCurrencyLabel);
  currencyCard.appendChild(cityOneValue);
  currencyCard.appendChild(cityTwoCurrencyLabel);
  currencyCard.appendChild(cityTwoValue);

  // currencies input

  cityOneLatLong = await getLatAndLon(
    globalCities['city one'],
    globalCountries['country one']['name' || 'nativeName']
  );

  cityTwoLatLong = await getLatAndLon(
    globalCities['city two'],
    globalCountries['country two']['name' || 'nativeName']
  );

  const timeZone1 = await getTimeZone(cityOneLatLong.lat, cityOneLatLong.lng);
  const timeZone2 = await getTimeZone(cityTwoLatLong.lat, cityTwoLatLong.lng);
  const timeZone1UTC =
    timeZone1.resourceSets[0].resources[0].timeZone.convertedTime
      .utcOffsetWithDst;
  const timeZone2UTC =
    timeZone2.resourceSets[0].resources[0].timeZone.convertedTime
      .utcOffsetWithDst;

  // Currency card UI
  timeZonesCard.innerHTML = '';

  const tzHeader = document.createElement('h2');
  tzHeader.textContent = 'Time Zones';
  timeZonesCard.appendChild(tzHeader);

  const tzCityOne = document.createElement('p');
  const tzCityTwo = document.createElement('p');
  tzCityOne.innerHTML = `${globalCities['city one']}: <strong>UTC ${timeZone1UTC}</strong>`;
  tzCityTwo.innerHTML = `${globalCities['city two']}: <strong>UTC ${timeZone2UTC}</strong>`;
  timeZonesCard.appendChild(tzCityOne);
  timeZonesCard.appendChild(tzCityTwo);

  const tzDifference = document.createElement('p');
  tzDifference.textContent = `Time Difference: ${Math.abs(
    convertTimeZone(timeZone1UTC) - convertTimeZone(timeZone2UTC)
  )} hours`;
  timeZonesCard.appendChild(tzDifference);

  const tzOneInputLabel = document.createElement('label');
  tzOneInputLabel.textContent = `${globalCities['city one']} Time`;
  const tzOneInput = document.createElement('input');

  const tzOneTime = await getTime(cityOneLatLong.lat, cityOneLatLong.lng);

  tzOneInput.value = tzOneTime.formatted;
  timeZonesCard.appendChild(tzOneInputLabel);
  timeZonesCard.appendChild(tzOneInput);

  const tzTwoInputLabel = document.createElement('label');
  tzTwoInputLabel.textContent = `${globalCities['city two']} Time`;
  const tzTwoInput = document.createElement('input');

  const tzTwoTime = await getTime(cityTwoLatLong.lat, cityTwoLatLong.lng);

  tzTwoInput.value = tzTwoTime.formatted;
  timeZonesCard.appendChild(tzTwoInputLabel);
  timeZonesCard.appendChild(tzTwoInput);

  // COVID card UI

  const covidData = await getCovidData();

  covidCard.innerHTML = '';
  const covidHeader = document.createElement('h2');
  covidHeader.textContent = 'COVID-19 Info';
  covidCard.appendChild(covidHeader);

  const covidCityOne = document.createElement('p');
  covidCityOne.innerHTML = `<strong>${globalCountries['country one'].name}</strong>`;
  covidCard.appendChild(covidCityOne);

  const covidOneConfirmed = document.createElement('span');
  const covidOneActive = document.createElement('span');
  const covidOneRecovered = document.createElement('span');
  const covidOneDeaths = document.createElement('span');

  covidOneConfirmed.innerHTML = `Confirmed: ${
    covidData.find(
      obj =>
        obj.countryRegion ===
        globalCountries['country one']['name' || 'nativeName']
    ).confirmed
  } `;
  covidOneActive.innerHTML = `Active: ${
    covidData.find(
      obj =>
        obj.countryRegion ===
        globalCountries['country one']['name' || 'nativeName']
    ).active
  } `;
  covidOneRecovered.innerHTML = `Recovered: ${
    covidData.find(
      obj =>
        obj.countryRegion ===
        globalCountries['country one']['name' || 'nativeName']
    ).recovered
  } `;
  covidOneDeaths.innerHTML = `Deaths: ${
    covidData.find(
      obj =>
        obj.countryRegion ===
        globalCountries['country one']['name' || 'nativeName']
    ).deaths
  } `;

  covidCard.appendChild(covidOneConfirmed);
  covidCard.appendChild(covidOneActive);
  covidCard.appendChild(covidOneRecovered);
  covidCard.appendChild(covidOneDeaths);

  const covidCityTwo = document.createElement('p');
  covidCityTwo.innerHTML = `<strong>${globalCountries['country two'].name}</strong>`;
  covidCard.appendChild(covidCityTwo);

  const covidTwoConfirmed = document.createElement('span');
  const covidTwoActive = document.createElement('span');
  const covidTwoRecovered = document.createElement('span');
  const covidTwoDeaths = document.createElement('span');

  covidTwoConfirmed.innerHTML = `Confirmed: ${
    covidData.find(
      obj =>
        obj.countryRegion ===
        globalCountries['country two']['name' || 'nativeName']
    ).confirmed
  } `;
  covidTwoActive.innerHTML = `Active: ${
    covidData.find(
      obj =>
        obj.countryRegion ===
        globalCountries['country two']['name' || 'nativeName']
    ).active
  } `;
  covidTwoRecovered.innerHTML = `Recovered: ${
    covidData.find(
      obj =>
        obj.countryRegion ===
        globalCountries['country two']['name' || 'nativeName']
    ).recovered
  } `;
  covidTwoDeaths.innerHTML = `Deaths: ${
    covidData.find(
      obj =>
        obj.countryRegion ===
        globalCountries['country two']['name' || 'nativeName']
    ).deaths
  } `;

  covidCard.appendChild(covidTwoConfirmed);
  covidCard.appendChild(covidTwoActive);
  covidCard.appendChild(covidTwoRecovered);
  covidCard.appendChild(covidTwoDeaths);
});
