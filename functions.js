// returns filtered cities based on the input element
const filterCities = input => {
  return cities.filter(
    city =>
      city['name'].toLowerCase().startsWith(input) ||
      city['country'].toLowerCase().includes(input)
  );
};

// returns the city based on input
const getCityFromInput = inputElement => {
  return inputElement.value.split(',')[0].trim();
};

// returns the city's country based on input
const getCountryFromInput = inputElement => {
  let country = inputElement.value.split(',');
  return country[country.length - 1].trim();
};

const convertTimeZone = timeZone => {
  return Number(timeZone.split(':')[0]);
};

const filterCovidInfo = (infoRequired, countryData, data) => {
  return data.find(obj => obj.iso2 === countryData.alpha2Code)[infoRequired];
};

const validateEmtyInput = input => {
  if (input.value === '') {
    input.classList.add('city-input--empty');
    setTimeout(() => input.classList.remove('city-input--empty'), 2000);
  }
};
