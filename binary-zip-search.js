const upperBoundedValueMap = require('./upper-bounded-zip-code-map.json')
const upperBoundedValueMapKeys = Object.keys(upperBoundedValueMap)

const returnIndexOrDirection = function(zipKeysArr, i, zip) {
  let rtIndex, ltIndex, rtZip, ltZip, lteRtZip, gtLtZip
  rtIndex = i
  ltIndex = i - 1
  rtZip = parseInt(zipKeysArr[rtIndex], 10)
  ltZip = parseInt(zipKeysArr[ltIndex], 10)
  if (ltIndex === 0 && zip <= ltZip) return ltIndex

  lteRtZip = zip <= rtZip
  gtLtZip = zip > ltZip
  eqLtZip = zip === ltZip
  if (lteRtZip && gtLtZip) {
    return rtIndex
  } else if (eqLtZip) {
    return ltIndex
  } else if (zip <= ltZip) {
    return 'L'
  } else if (zip > rtZip) {
    return 'R'
  }
}

const binarySearch = function(zipKeysArr, zip) {
  let start = 0,
    end = zipKeysArr.length - 1,
    zipNum = parseInt(zip, 10)

  // Iterate while start not meets end
  while (start <= end) {
    // Find the mid index
    let mid = Math.floor((start + end) / 2)

    // If zip is found to be mid or mid-1 return one of them
    let indexOrDirection = returnIndexOrDirection(zipKeysArr, mid, zipNum)
    if (indexOrDirection === mid || indexOrDirection === mid - 1) {
      return zipKeysArr[indexOrDirection]
    }
    // Else continue with left or right half
    else if (indexOrDirection === 'R') {
      start = mid + 1
    } else if (indexOrDirection === 'L') {
      end = mid - 1
    }
  }
  return false
}

const getTimezoneIndex = function(zipString) {
  const foundZipIndex = binarySearch(upperBoundedValueMapKeys, zipString)
  return upperBoundedValueMap[foundZipIndex]
}

module.exports = getTimezoneIndex