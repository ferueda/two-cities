const getCitiesData = async () => {
  const res = await fetch('world-cities_json.json');
  return await res.json();
};

// const getCountryData = async country => {
//   const res = await fetch('https://restcountries.eu/rest/v2/all');

//   const data = await res.json();
//   return data.find(obj => obj.name === country || obj.nativeName === country);
// };

const getCountryData = country => {
  return fetch('https://restcountries.eu/rest/v2/all')
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data.find(
        obj => obj.name === country || obj.nativeName === country
      );
    });
};
