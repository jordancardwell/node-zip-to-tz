import upperBoundedValueMap from './upper-bounded-zip-code-map.json'
const upperBoundedValueMapKeys = Object.keys(upperBoundedValueMap)

type IndexOrDirection = number | 'L' | 'R'

const returnIndexOrDirection = function(
  zipKeysArr: string[],
  i: number,
  zip: number
): IndexOrDirection {
  let rtIndex, ltIndex, rtZip, ltZip, lteRtZip, gtLtZip, eqLtZip
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
  } else {
    // zip > rtZip
    return 'R'
  }
}

const binarySearch = function(zipKeysArr: string[], zip: string): string {
  let start = 0,
    end = zipKeysArr.length - 1,
    zipNum = parseInt(zip, 10)

  // Iterate while start not meets end
  while (start <= end) {
    // Find the mid index
    const mid = Math.floor((start + end) / 2)

    // If zip is found to be mid or mid-1 return one of them
    const indexOrDirection = returnIndexOrDirection(zipKeysArr, mid, zipNum)
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
  return ''
}

export default function getTimezoneKey(zipString: string): string {
  const foundZipKey = binarySearch(upperBoundedValueMapKeys, zipString)
  return upperBoundedValueMap[foundZipKey]
}
