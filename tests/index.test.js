/**
 * @file tests/index.test.js
 *
 * @description tests zipToTz function against every zipcode in zipCodes.json
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */

const _ = require('lodash')
const referenceZipToTzMap = require('../zipcodes.json')
const referenceZipToTzMapKeys = Object.keys(referenceZipToTzMap)
const TIMEZONE_MAP = require('../timezone-map')
const zipToTz = require('../')

const zipsShouldMatch = zip => {
  const referenceTzIndex = referenceZipToTzMap[zip]
  const referenceTz = TIMEZONE_MAP[referenceTzIndex]
  const resultTz = zipToTz(zip)
  expect(resultTz).toBe(referenceTz)
}

describe('zipToTz', () => {
  it('should match results from reference data (zipcodes.json)', () => {
    expect.assertions(referenceZipToTzMapKeys.length)
    _.forEach(referenceZipToTzMapKeys, zipsShouldMatch)
  })

  describe('binary search edge cases', () => {
    it.each([
      ['99768', 'a deep right hand upper bound'],
      ['99763', 'a deep left hand upper bound'],
      ['99765', 'a deep non-upper bound'],
      ['10001', 'the first zip in dataset'],
      ['99929', 'the last zip in dataset'],
      ['32399', 'the first upperbound in dataset'],
      ['32455', 'the second upperbound in dataset'],
      ['00501', 'the first numerically sorted zip in dataset']
    ])('should match zip that is %s', zipsShouldMatch)
  })
})
