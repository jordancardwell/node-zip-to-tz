const zipToTzMap = require('./zipcodes.json')
const path = require('path')
const fs = require('fs')
const FILENAME = 'upper-bounded-zip-code-map.json'
const PACKAGE = require('./package.json')
const ARCHIVED_FILENAME = FILENAME.split('.').join(`.v${PACKAGE.version}.${new Date().toISOString().split('T')[0]}.`)

console.log('FILENAME', FILENAME)
console.log('ARCHIVED_FILENAME', ARCHIVED_FILENAME)

const sortedKeys = Object.keys(zipToTzMap).sort(function(a, b) {
  const A = parseInt(a, 10)
  const B = parseInt(b, 10)
  if (A < B) return -1
  if (A > B) return 1
  return 0
})
// console.log(sortedKeys)
let thisTZ,
  lastTZ = -1
let thisZip, lastZip
const upperBoundedTzToZipValueMap = {}
sortedKeys.forEach((key, ind) => {
  thisZip = parseInt(key, 10)
  thisTZ = zipToTzMap[key]
  // handle first TZ entry
  if (lastTZ < 0) {
    lastTZ = thisTZ
  }
  // handle upper bound entry
  if (zipToTzMap[key] !== lastTZ) {
    upperBoundedTzToZipValueMap[lastZip] = lastTZ
    lastTZ = thisTZ
  }
  // handle final entry
  if (ind === sortedKeys.length - 1) {
    upperBoundedTzToZipValueMap[thisZip] = lastTZ
  }
  lastZip = thisZip
})
// console.log(JSON.stringify(upperBoundedTzToZipValueMap))

const currentPath = path.resolve(__dirname, FILENAME)
const archivePath = path.resolve(__dirname, 'archive', ARCHIVED_FILENAME)
console.log(`archiving previous to\n\t${archivePath}`)
fs.copyFileSync(currentPath, archivePath)
console.log(`saving current to\n\t${currentPath}`)
fs.writeFileSync(currentPath, JSON.stringify(upperBoundedTzToZipValueMap, null, 2), 'ascii')
