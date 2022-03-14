# zip-to-tz

This is a re-implementation of [DoubleDor's `node-zipcode-to-timezone`](https://github.com/DoubleDor/node-zipcode-to-timezone), but optimized for space so that you can use it in the browser with less bloat.

We utilize the same source data in `zipcodes.json` and generate a map of only the upperbounds. The numercially ordered zipcodes (indexes into `timezone-map.json`), don't produce timezone indexes that are strictly monotonically increasing (for obvious reasons), so while this isn't a perfect solution, the Gzipped size of the optimized zipcode map is **2.8%** of the original Gzipped zipcode map.

Since we don't have an exhaustive list of all zipcodes, we use a binary search function to find where the zipcode lies within the map of upper bounds and return the result.

This module assumes that the zipcode is valid. The original module returned `undefined` for unknown or invalid zipcodes, because we don't have an exhaustive list, we'll return a timezone for potentially invalid zipcodes.

This module basically trades space for time as the lookup isn't a direct attribute read, but a binary search of the optimized zipcode map keys until we find what range the target zipcode lies in.

|                   | entries | size  | size (gzipped) |
| ----------------- | ------- | ----- | -------------- |
| zipcodes map      | 41962   | 672KB | 107KB          |
| upper bounded map | 1026    | 14KB  | 3KB            |

e.g.
**Instead of:**

```javascript
{
  ...
  '11111': 0,
  '11112': 0,
  ...
  '11914': 0,
  '11915': 1,
  '11916': 0,
  '11917': 1,
  '11918': 0,
  '11919': 1,
  '11920': 1,
  ...
  '13587': 1,
  '13588': 1,
  '13589': 2,
  '13590': 2,
  ...
  '15623': 2,
  '13624': 2,
  '13625': 3,
  '13626': 3,
  ...
}
```

**We'd keep track of:**

```javascript
  ...
  '11914': 0,
  '11915': 1,
  '11916': 0,
  '11917': 1,
  '11918': 0,
  '13588': 1,
  '13624': 2,
  '13625': //wherever 3 ends
  ...

```

## Installation

```
npm install --save zip-to-tz
```

## Usage

```
var zipToTz = require( 'zip-to-tz' );

var tz = zipToTz( '94110' );
console.log( tz ); // America/Los_Angeles
```

```
import zipToTz from 'zip-to-tz'

const tz = zipToTz( '94110' );
console.log( tz ); // America/Los_Angeles
```

## Other info

This project uses the timezone list found here:

```
https://sourceforge.net/projects/zip2timezone/files/
```
