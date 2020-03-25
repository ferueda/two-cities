// returns filtered cities based on the input element
const filterCities = input => {
  return cities.filter(
    city =>
      city['name'].toLowerCase().startsWith(input) ||
      city['country'].toLowerCase().includes(input)
  );
};

// renders  city suggestions based on the entered input
const displayCitySuggestions = e => {
  const input = e.target.value.toLowerCase();
  const target =
    e.target.id === 'city-one' ? cityOneSuggestions : cityTwoSuggestions;

  target.innerHTML = '';

  const filteredCities = filterCities(input);

  filteredCities.slice(0, 10).forEach(city => {
    const cityEl = document.createElement('div');
    cityEl.innerHTML = `${city['name']}, ${city.country}`;
    target.appendChild(cityEl);
  });

  if (input === '') {
    target.innerHTML = '';
  }
};

// returns the city's country based on input
const getCountryFromInput = inputElement => {
  let country = inputElement.value.split(',');
  return country[country.length - 1].trim();
};

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
