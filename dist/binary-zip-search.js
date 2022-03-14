"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var upper_bounded_zip_code_map_json_1 = require("./upper-bounded-zip-code-map.json");
var upperBoundedValueMapKeys = Object.keys(upper_bounded_zip_code_map_json_1.default);
var returnIndexOrDirection = function (zipKeysArr, i, zip) {
    var rtIndex, ltIndex, rtZip, ltZip, lteRtZip, gtLtZip, eqLtZip;
    rtIndex = i;
    ltIndex = i - 1;
    rtZip = parseInt(zipKeysArr[rtIndex], 10);
    ltZip = parseInt(zipKeysArr[ltIndex], 10);
    if (ltIndex === 0 && zip <= ltZip)
        return ltIndex;
    lteRtZip = zip <= rtZip;
    gtLtZip = zip > ltZip;
    eqLtZip = zip === ltZip;
    if (lteRtZip && gtLtZip) {
        return rtIndex;
    }
    else if (eqLtZip) {
        return ltIndex;
    }
    else if (zip <= ltZip) {
        return 'L';
    }
    else {
        // zip > rtZip
        return 'R';
    }
};
var binarySearch = function (zipKeysArr, zip) {
    var start = 0, end = zipKeysArr.length - 1, zipNum = parseInt(zip, 10);
    // Iterate while start not meets end
    while (start <= end) {
        // Find the mid index
        var mid = Math.floor((start + end) / 2);
        // If zip is found to be mid or mid-1 return one of them
        var indexOrDirection = returnIndexOrDirection(zipKeysArr, mid, zipNum);
        if (indexOrDirection === mid || indexOrDirection === mid - 1) {
            return zipKeysArr[indexOrDirection];
        }
        // Else continue with left or right half
        else if (indexOrDirection === 'R') {
            start = mid + 1;
        }
        else if (indexOrDirection === 'L') {
            end = mid - 1;
        }
    }
    return '';
};
function getTimezoneKey(zipString) {
    var foundZipKey = binarySearch(upperBoundedValueMapKeys, zipString);
    return upper_bounded_zip_code_map_json_1.default[foundZipKey];
}
exports.default = getTimezoneKey;
//# sourceMappingURL=binary-zip-search.js.map