const cityOneInput = document.getElementById('city-one');
const cityTwoInput = document.getElementById('city-two');
const cityOneSuggestions = document.getElementById('city-one-suggestions');
const cityTwoSuggestions = document.getElementById('city-two-suggestions');
const arrowBtn = document.getElementById('arrow');
const searchBtn = document.getElementById('search-btn');

const cardContainer = document.getElementById('card-container');
const currencyCard = document.getElementById('currency-card');
const timeZonesCard = document.getElementById('time-zones-card');
const covidCard = document.getElementById('covid-card');

// fetchs cities data and assign them to cities variable
let cities = [];

getCitiesData().then(data => {
  cities = data;
});

// city input listeners. Renders suggested cities based on input
cityOneInput.addEventListener('input', displayCitySuggestions);
cityTwoInput.addEventListener('input', displayCitySuggestions);

cityOneSuggestions.addEventListener('click', e => {
  cityOneInput.value = e.target.textContent;
  cityOneSuggestions.innerHTML = '';
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

// display the initial heading and loading text in each card
const renderHeadingAndLoading = (card, titleText) => {
  card.innerHTML = `
    <h2>${titleText}</h2>
    <p>Loading...</p>
  `;
};

const renderCurrencyCard = (countryOneData, countryTwoData, rate) => {
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

  // render currencies name, code and rate values
  currencyCard.innerHTML = `
    <h2>Currency Exchange</h2>

    <p><span class="city-one-curr">1 ${countryOneData.currencies[0].name} (${
    countryOneData.currencies[0].code
  })</span></p>

    <span>equals to</span>

    <p><span class="city-two-curr">${rate.toFixed(2)} ${
    countryTwoData.currencies[0].name
  } (${countryTwoData.currencies[0].code})</span></p>

    <span class="card-currency_date">${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()} - ${date.getHours()}:${
    date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`
  }</span>

    <label for="city-one-curr">${countryOneData.currencies[0].code}</label>
    <input type="text" name="city-one-curr" value="${(1).toFixed(2)}"/>
    <label for="city-two-curr">${countryTwoData.currencies[0].code}</label>
    <input type="text" name="city-two-curr" value="${(1 * rate).toFixed(2)}"/>
  `;

  cityOneValue = document.querySelector('input[name="city-one-curr"]');
  cityTwoValue = document.querySelector('input[name="city-two-curr"]');

  cityOneValue.addEventListener('change', updateCurrencyInput);
  cityTwoValue.addEventListener('change', updateCurrencyInput);

  // const cityOneCurrencyLabel = document.createElement('label');
  // const cityTwoCurrencyLabel = document.createElement('label');

  // cityOneCurrencyLabel.setAttribute('for', 'city-one-curr');
  // cityTwoCurrencyLabel.setAttribute('for', 'city-two-curr');

  // cityOneCurrencyLabel.textContent = `${countryOneData.currencies[0].code}`;
  // cityTwoCurrencyLabel.textContent = `${countryTwoData.currencies[0].code}`;

  // const cityOneValue = document.createElement('input');
  // const cityTwoValue = document.createElement('input');

  // cityOneValue.setAttribute('type', 'text');
  // cityOneValue.setAttribute('name', 'city-one-curr');

  // cityTwoValue.setAttribute('type', 'text');
  // cityTwoValue.setAttribute('name', 'city-two-curr');

  // cityOneValue.addEventListener('change', updateCurrencyInput);
  // cityTwoValue.addEventListener('change', updateCurrencyInput);

  // cityOneValue.value = (1).toFixed(2);
  // cityTwoValue.value = (1 * rate).toFixed(2);

  // currencyCard.appendChild(cityOneCurrencyLabel);
  // currencyCard.appendChild(cityOneValue);
  // currencyCard.appendChild(cityTwoCurrencyLabel);
  // currencyCard.appendChild(cityTwoValue);

  // currencyCard.innerHTML = `
  //   <h2>Currency Exchange</h2>`;

  // const cityOneCurrency = document.createElement('p');
  // cityOneCurrency.innerHTML = `<span class="city-one-curr">1 ${countryOneData.currencies[0].name} (${countryOneData.currencies[0].code})</span>`;
  // currencyCard.appendChild(cityOneCurrency);

  // const equals = document.createElement('span');
  // equals.textContent = 'equals to';
  // currencyCard.appendChild(equals);

  // const cityTwoCurrency = document.createElement('p');
  // cityTwoCurrency.innerHTML = `<span class="city-two-curr">${rate.toFixed(2)} ${
  //   countryTwoData.currencies[0].name
  // } (${countryTwoData.currencies[0].code})</span>`;
  // currencyCard.appendChild(cityTwoCurrency);

  // // render date element
  // const dateEl = document.createElement('span');
  // dateEl.classList.add('card-currency_date');

  // dateEl.textContent = `${
  //   months[date.getMonth()]
  // } ${date.getDate()}, ${date.getFullYear()} - ${date.getHours()}:${
  //   date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`
  // }`;

  // currencyCard.appendChild(dateEl);
};

// search btn listener
searchBtn.addEventListener('click', async () => {
  cardContainer.style.display = 'flex';

  renderHeadingAndLoading(currencyCard, 'Currency Exchange');
  renderHeadingAndLoading(timeZonesCard, 'Time Zones');
  renderHeadingAndLoading(covidCard, 'COVID-19 Info');

  const cityOne = getCityFromInput(cityOneInput);
  const cityTwo = getCityFromInput(cityTwoInput);

  const countryOne = getCountryFromInput(cityOneInput);
  const countryTwo = getCountryFromInput(cityTwoInput);

  const [countryOneData, countryTwoData] = await Promise.all([
    getCountryData(countryOne),
    getCountryData(countryTwo)
  ]);

  const rate = await getExchangeRateData(
    countryOneData.currencies[0].code,
    countryTwoData.currencies[0].code
  );

  renderCurrencyCard(countryOneData, countryTwoData, rate);

  cityOneLatLong = await getLatAndLonData(
    cityOne,
    countryOneData['name' || 'nativeName']
  );

  cityTwoLatLong = await getLatAndLonData(
    cityTwo,
    countryTwoData['name' || 'nativeName']
  );

  const timeZone1 = await getTimeZoneData(
    cityOneLatLong.lat,
    cityOneLatLong.lng
  );
  const timeZone2 = await getTimeZoneData(
    cityTwoLatLong.lat,
    cityTwoLatLong.lng
  );
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
  tzCityOne.innerHTML = `${cityOne}: <strong>UTC ${timeZone1UTC}</strong>`;
  tzCityTwo.innerHTML = `${cityTwo}: <strong>UTC ${timeZone2UTC}</strong>`;
  timeZonesCard.appendChild(tzCityOne);
  timeZonesCard.appendChild(tzCityTwo);

  const tzDifference = document.createElement('p');
  tzDifference.textContent = `Time Difference: ${Math.abs(
    convertTimeZone(timeZone1UTC) - convertTimeZone(timeZone2UTC)
  )} hours`;
  timeZonesCard.appendChild(tzDifference);

  const tzOneInputLabel = document.createElement('label');
  tzOneInputLabel.textContent = `${cityOne} Time`;
  const tzOneInput = document.createElement('input');

  const tzOneTime = await getTimeData(cityOneLatLong.lat, cityOneLatLong.lng);

  tzOneInput.value = tzOneTime.formatted;
  timeZonesCard.appendChild(tzOneInputLabel);
  timeZonesCard.appendChild(tzOneInput);

  const tzTwoInputLabel = document.createElement('label');
  tzTwoInputLabel.textContent = `${cityTwo} Time`;
  const tzTwoInput = document.createElement('input');

  const tzTwoTime = await getTimeData(cityTwoLatLong.lat, cityTwoLatLong.lng);

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
  covidCityOne.innerHTML = `<strong>${countryOneData.name}</strong>`;
  covidCard.appendChild(covidCityOne);

  const covidOneConfirmed = document.createElement('span');
  const covidOneActive = document.createElement('span');
  const covidOneRecovered = document.createElement('span');
  const covidOneDeaths = document.createElement('span');

  covidOneConfirmed.innerHTML = `Confirmed: ${
    covidData.find(
      obj => obj.countryRegion === countryOneData['name' || 'nativeName']
    ).confirmed
  } `;
  covidOneActive.innerHTML = `Active: ${
    covidData.find(
      obj => obj.countryRegion === countryOneData['name' || 'nativeName']
    ).active
  } `;
  covidOneRecovered.innerHTML = `Recovered: ${
    covidData.find(
      obj => obj.countryRegion === countryOneData['name' || 'nativeName']
    ).recovered
  } `;
  covidOneDeaths.innerHTML = `Deaths: ${
    covidData.find(
      obj => obj.countryRegion === countryOneData['name' || 'nativeName']
    ).deaths
  } `;

  covidCard.appendChild(covidOneConfirmed);
  covidCard.appendChild(covidOneActive);
  covidCard.appendChild(covidOneRecovered);
  covidCard.appendChild(covidOneDeaths);

  const covidCityTwo = document.createElement('p');
  covidCityTwo.innerHTML = `<strong>${countryTwoData.name}</strong>`;
  covidCard.appendChild(covidCityTwo);

  const covidTwoConfirmed = document.createElement('span');
  const covidTwoActive = document.createElement('span');
  const covidTwoRecovered = document.createElement('span');
  const covidTwoDeaths = document.createElement('span');

  covidTwoConfirmed.innerHTML = `Confirmed: ${
    covidData.find(
      obj => obj.countryRegion === countryTwoData['name' || 'nativeName']
    ).confirmed
  } `;
  covidTwoActive.innerHTML = `Active: ${
    covidData.find(
      obj => obj.countryRegion === countryTwoData['name' || 'nativeName']
    ).active
  } `;
  covidTwoRecovered.innerHTML = `Recovered: ${
    covidData.find(
      obj => obj.countryRegion === countryTwoData['name' || 'nativeName']
    ).recovered
  } `;
  covidTwoDeaths.innerHTML = `Deaths: ${
    covidData.find(
      obj => obj.countryRegion === countryTwoData['name' || 'nativeName']
    ).deaths
  } `;

  covidCard.appendChild(covidTwoConfirmed);
  covidCard.appendChild(covidTwoActive);
  covidCard.appendChild(covidTwoRecovered);
  covidCard.appendChild(covidTwoDeaths);
});
