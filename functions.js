let cities = [];

getCitiesData().then(data => {
  cities = data;
});

let globalCities = {
  'city one': '',
  'city two': ''
};

let globalCountries = {
  'country one': '',
  'country two': ''
};

let globalRate;

// returns filtered cities based on the input element
function filterCities(input) {
  return cities.filter(
    city =>
      city['name'].toLowerCase().startsWith(input) ||
      city['country'].toLowerCase().includes(input)
  );
}

function convertTimeZone(timeZone) {
  return Number(timeZone.split(':')[0]);
}

function updateCurrencyInput(e) {
  if (e.target.id === 'city-one-value') {
    cityTwoValue.value = (e.target.value * globalRate).toFixed(2);
  } else if (e.target.id === 'city-two-value') {
    cityOneValue.value = (e.target.value / globalRate).toFixed(2);
  }
  e.target.value = e.target.value;
}
