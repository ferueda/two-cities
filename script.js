const cityOneInput = document.getElementById('city-one');
const cityTwoInput = document.getElementById('city-two');
const cityOneContainer = document.getElementById('city-one-container');
const cityTwoContainer = document.getElementById('city-Two-container');
const cityOneSuggestions = document.getElementById('city-one-suggestions');
const cityTwoSuggestions = document.getElementById('city-two-suggestions');
const arrowBtn = document.getElementById('arrow');

let cities = [];

async function getData() {
  const res = await fetch('world-cities_json.json');
  const data = await res.json();
  cities = data;
}

function filterCities(input) {
  return cities.filter(
    city =>
      city['name'].toLowerCase().startsWith(input) ||
      city['country'].toLowerCase().includes(input)
  );
}
-(
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
  })
);

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
