const request = require('request')

const fetchMyIP = function (callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      // const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
  // use request to fetch IP address from JSON API
};
const fetchCoordsByIP = function (ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body);

    callback(null, { latitude, longitude });

  });
};
const fetchISSFlyOverTimes = function (coords, callback) {

  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`

  request(url, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times. ${body}`), null);
      return;
    }
    const passes = JSON.parse(body).response;

    callback(null, passes);
  });

};

const nextISSTimesFormMyLocation = (callback) => {

}

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };