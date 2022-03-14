"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file index.ts
 *
 * @description Uses an optimized map of the data in zipcodes.json, and binary search
 * to return the timezone a valid zipcode
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */
var binary_zip_search_1 = require("./binary-zip-search");
var timezone_map_1 = require("./timezone-map");
/**
 * finds zipcode in upper-bounded-zip-code-map.json using binary search
 * @param  {String} zipcode The zipcode to lookup, as a String
 * @return {String|undefined}  Return long name timezone name (e.g. America/Los_Angeles)
 *                        for the zipcode, null if not found
 */
function zipToTz(zipcode) {
    var timezoneIndex = (0, binary_zip_search_1.default)(zipcode);
    return timezone_map_1.default.hasOwnProperty(timezoneIndex)
        ? timezone_map_1.default[timezoneIndex]
        : undefined;
}
exports.default = zipToTz;
//# sourceMappingURL=index.js.map