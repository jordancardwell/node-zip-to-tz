/**
 * @file index.ts
 *
 * @description Uses an optimized map of the data in zipcodes.json, and binary search
 * to return the timezone a valid zipcode
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */
import binaryZipSearch from './binary-zip-search'
import TIMEZONE_MAP from './timezone-map'

/**
 * finds zipcode in upper-bounded-zip-code-map.json using binary search
 * @param  {String} zipcode The zipcode to lookup, as a String
 * @return {String|undefined}  Return long name timezone name (e.g. America/Los_Angeles)
 *                        for the zipcode, null if not found
 */
export default function zipToTz(zipcode) {
  var timezoneIndex = binaryZipSearch(zipcode)
  return TIMEZONE_MAP.hasOwnProperty(timezoneIndex)
    ? TIMEZONE_MAP[timezoneIndex]
    : undefined
}
