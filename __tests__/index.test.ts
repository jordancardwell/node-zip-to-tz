/**
 * @file __tests__/index.test.ts
 *
 * @description tests zipToTz function against every zipcode in zipCodes.json
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */
import { forEach } from 'lodash'
import referenceZipToTzMap from '../src/zipcodes.json'
const referenceZipToTzMapKeys = Object.keys(referenceZipToTzMap)
import TIMEZONE_MAP from '../src/timezone-map'
import zipToTz from '../dist'

const zipsShouldMatch = zip => {
  const referenceTzIndex = referenceZipToTzMap[zip]
  const referenceTz = TIMEZONE_MAP[referenceTzIndex]
  const resultTz = zipToTz(zip)
  expect(resultTz).toBe(referenceTz)
}

describe('zipToTz', () => {
  it('should match results from reference data (zipcodes.json)', () => {
    expect.assertions(referenceZipToTzMapKeys.length)
    forEach(referenceZipToTzMapKeys, zipsShouldMatch)
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

  describe('known tzs', () => {
    test('should return America/New_York for zip 33487', () => {
      expect(zipToTz('33487')).toBe('America/New_York')
    })

    test('should return America/Los_Angeles for zip 97838', () => {
      expect(zipToTz('97838')).toBe('America/Los_Angeles')
    })

    test('should return America/Indiana/Indianapolis for zip 46350', () => {
      expect(zipToTz('46350')).toBe('America/Indiana/Indianapolis')
    })

    // https://github.com/DoubleDor/node-zipcode-to-timezone/issues/9
    test('should return time zones for problem zones', () => {
      expect(zipToTz('84129')).toBe('America/Denver')    
      expect(zipToTz('72713')).toBe('America/Chicago')
      expect(zipToTz('60418')).toBe('America/Chicago')
    })
  })
})
