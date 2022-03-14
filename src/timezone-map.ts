type Timezone =
  | 'America/New_York'
  | 'America/Chicago'
  | 'America/Denver'
  | 'America/Los_Angeles'
  | 'America/Kentucky/Louisville'
  | 'America/Indiana/Indianapolis'
  | 'America/Detroit'
  | 'America/Boise'
  | 'America/Phoenix'
  | 'America/Anchorage'
  | 'Pacific/Honolulu'
  | 'America/Indiana/Knox'
  | 'America/Indiana/Winamac'
  | 'America/Indiana/Vevay'
  | 'America/Indiana/Marengo'
  | 'America/Indiana/Vincennes'
  | 'America/Indiana/Tell_City'
  | 'America/Indiana/Petersburg'
  | 'America/Menominee'
  | 'America/Shiprock'
  | 'America/Nome'
  | 'America/Juneau'
  | 'America/Kentucky/Monticello'
  | 'America/North_Dakota/Center'
  | 'America/Yakutat'

const TimezoneMap: Record<string, Timezone> = Object.freeze({
  0: 'America/New_York',
  1: 'America/Chicago',
  2: 'America/Denver',
  3: 'America/Los_Angeles',
  4: 'America/Kentucky/Louisville',
  5: 'America/Indiana/Indianapolis',
  6: 'America/Detroit',
  7: 'America/Boise',
  8: 'America/Phoenix',
  9: 'America/Anchorage',
  10: 'Pacific/Honolulu',
  11: 'America/Indiana/Knox',
  12: 'America/Indiana/Winamac',
  13: 'America/Indiana/Vevay',
  14: 'America/Indiana/Marengo',
  15: 'America/Indiana/Vincennes',
  16: 'America/Indiana/Tell_City',
  17: 'America/Indiana/Petersburg',
  18: 'America/Menominee',
  19: 'America/Shiprock',
  20: 'America/Nome',
  21: 'America/Juneau',
  22: 'America/Kentucky/Monticello',
  23: 'America/North_Dakota/Center',
  24: 'America/Yakutat'
})

export default TimezoneMap
