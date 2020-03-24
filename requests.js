// const getCitiesData = () => {
//   return fetch('world-cities_json.json').then(res => {
//     if (res.status === 200) {
//       return res.json();
//     } else {
//       throw new Error('Unable to fetch cities data');
//     }
//   });
// };

const getCitiesData = async () => {
  const response = await fetch('world-cities_json.json');
  if (response.status === 200) {
    return await response.json();
  } else {
    throw new Error('Unable to fetch cities data');
  }
};

// const getCountryData = country => {
//   return fetch('https://restcountries.eu/rest/v2/all')
//     .then(res => {
//       if (res.status === 200) {
//         return res.json();
//       } else {
//         throw new Error('Unable to fetch countries data');
//       }
//     })
//     .then(data => {
//       return data.find(
//         obj => obj.name === country || obj.nativeName === country
//       );
//     });
// };

const getCountryData = async country => {
  const response = await fetch('https://restcountries.eu/rest/v2/all');
  if (response.status === 200) {
    const data = await response.json();
    return data.find(obj => obj.name === country || obj.nativeName === country);
  } else {
    throw new Error('Unable to fetch countries data');
  }
};

// const getExchangeRate = (base, target) => {
//   return fetch(
//     `https://openexchangerates.org/api/latest.json?app_id=50b9e063716540c3b23c99c33e83bbb2&base=USD`
//   )
//     .then(res => {
//       if (res.status === 200) {
//         return res.json();
//       } else {
//         throw new Error('Unable to fetch exchange rate data');
//       }
//     })
//     .then(data => {
//       return data.rates[target] / data.rates[base];
//     });
// };

const getExchangeRate = async (base, target) => {
  const response = await fetch(
    `https://openexchangerates.org/api/latest.json?app_id=50b9e063716540c3b23c99c33e83bbb2&base=USD`
  );
  if (response.status === 200) {
    const data = await response.json();
    return data.rates[target] / data.rates[base];
  } else {
    throw new Error('Unable to fetch exchange rates data');
  }
};

// const getLatAndLon = (city, country) => {
//   return fetch(
//     `https://api.opencagedata.com/geocode/v1/json?q=${city}+${country}&key=1329eac7d692480f865fcecd32eee0ae&pretty=1`
//   )
//     .then(res => {
//       if (res.status === 200) {
//         return res.json();
//       } else {
//         throw new Error('Unable to fetch latitude and longitude data');
//       }
//     })
//     .then(data => {
//       return data.results[0].geometry;
//     });
// };

const getLatAndLon = async (city, country) => {
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${city}+${country}&key=1329eac7d692480f865fcecd32eee0ae&pretty=1`
  );
  if (response.status === 200) {
    const data = await response.json();
    return data.results[0].geometry;
  } else {
    throw new Error('Unable to fetch latitude and longitude data');
  }
};

// const getTimeZone = (lat, lon) => {
//   return fetch(
//     `https://dev.virtualearth.net/REST/v1/timezone/${lat},${lon}?key=Au3EwanrpGrNR8JnlaXmkbk8nFFOA2Pcyv1jIp56gyB6TZm6N6XLpXdnwAJcapAe`
//   ).then(res => {
//     if (res.status === 200) {
//       return res.json();
//     } else {
//       throw new Error('Unable to fetch time zones data');
//     }
//   });
// };

const getTimeZone = async (lat, lon) => {
  const response = await fetch(
    `https://dev.virtualearth.net/REST/v1/timezone/${lat},${lon}?key=Au3EwanrpGrNR8JnlaXmkbk8nFFOA2Pcyv1jIp56gyB6TZm6N6XLpXdnwAJcapAe`
  );
  if (response.status === 200) {
    return await response.json();
  } else {
    throw new Error('Unable to fetch time zones data');
  }
};

// const getTime = (lat, lon) => {
//   return fetch(
//     `http://api.timezonedb.com/v2.1/get-time-zone?key=RMUYV0BGPUY9&format=json&by=position&lat=${lat}&lng=${lon}`
//   ).then(res => {
//     if (res.status === 200) {
//       return res.json();
//     } else {
//       throw new Error('Unable to fetch time data');
//     }
//   });
// };

const getTime = async (lat, lon) => {
  const response = await fetch(
    `http://api.timezonedb.com/v2.1/get-time-zone?key=RMUYV0BGPUY9&format=json&by=position&lat=${lat}&lng=${lon}`
  );
  if (response.status === 200) {
    return await response.json();
  } else {
    throw new Error('Unable to fetch time data');
  }
};

// const getCovidData = () => {
//   return fetch('https://covid19.mathdro.id/api/confirmed').then(res => {
//     if (res.status === 200) {
//       return res.json();
//     } else {
//       throw new Error('Unable to fetch Covid-19 data');
//     }
//   });
// };

const getCovidData = async () => {
  const response = await fetch('https://covid19.mathdro.id/api/confirmed');
  if (response.status === 200) {
    return await response.json();
  } else {
    throw new Error('Unable to fetch COVID-19 data');
  }
};
