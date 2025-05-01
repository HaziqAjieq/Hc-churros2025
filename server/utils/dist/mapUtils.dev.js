"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('url'),
    URL = _require.URL;
/**
 * Extracts coordinates from various Google Maps URL formats
 * @param {string} mapsUrl - The Google Maps URL
 * @returns {Object} { latitude: number, longitude: number }
 * @throws {Error} If URL is invalid or coordinates can't be extracted
 */


function getCoordinatesFromUrl(mapsUrl) {
  try {
    var url = new URL(mapsUrl); // format1 : https://www.google.com/maps?q=latitude,longitude

    if (url.searchParams.has('q')) {
      var _url$searchParams$get = url.searchParams.get('q').split(','),
          _url$searchParams$get2 = _slicedToArray(_url$searchParams$get, 2),
          lat = _url$searchParams$get2[0],
          lng = _url$searchParams$get2[1];

      return {
        latitude: parseFloat(lat),
        longitude: parseFloat(lng)
      };
    } // format 2: https://www.google.com/maps/place/.../@lat,lng,z


    var match = url.pathname.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);

    if (match) {
      return {
        latitude: parseFloat(match[1]),
        longitude: parseFloat(match[2])
      };
    }

    throw new Error('Invalid Google Maps URL format');
  } catch (err) {
    throw new Error('Could not parse Google Maps URL:' + err.message);
  }
}
/**
 * Generates a Google Maps URL from coordinates
 * @param {number} latitude 
 * @param {number} longitude 
 * @returns {string} Google Maps URL
 */


function generateMapsUrl(latitude, longitude) {
  return "https://www.google.com/maps?q=".concat(latitude, ",").concat(longitude);
}

module.exports = {
  generateMapsUrl: generateMapsUrl,
  getCoordinatesFromUrl: getCoordinatesFromUrl
};