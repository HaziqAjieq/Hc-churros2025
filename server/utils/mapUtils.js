const {URL} = require('url');

/**
 * Extracts coordinates from various Google Maps URL formats
 * @param {string} mapsUrl - The Google Maps URL
 * @returns {Object} { latitude: number, longitude: number }
 * @throws {Error} If URL is invalid or coordinates can't be extracted
 */

function getCoordinatesFromUrl(mapsUrl) {
  try {
    const url = new URL(mapsUrl);

    // format1 : https://www.google.com/maps?q=latitude,longitude

    if(url.searchParams.has('q')){
      const [lat , lng] = url.searchParams.get('q').split(',');
      return{
        latitude: parseFloat(lat),
        longitude:parseFloat(lng)
      };
    }

    // format 2: https://www.google.com/maps/place/.../@lat,lng,z

    const match = url.pathname.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (match) {
      return {
        latitude:parseFloat(match[1]),
        longitude:parseFloat(match[2])
      };
    }

    throw new Error('Invalid Google Maps URL format');
  }catch(err){
    throw new Error('Could not parse Google Maps URL:' + err.message)
  }
}

/**
 * Generates a Google Maps URL from coordinates
 * @param {number} latitude 
 * @param {number} longitude 
 * @returns {string} Google Maps URL
 */

function generateMapsUrl(latitude,longitude) {
  return `https://www.google.com/maps?q=${latitude},${longitude}`;
}

module.exports = {
  generateMapsUrl,
  getCoordinatesFromUrl
}