/**
 * finds zipcode in upper-bounded-zip-code-map.json using binary search
 * @param  {String} zipcode The zipcode to lookup, as a String
 * @return {String|undefined}  Return long name timezone name (e.g. America/Los_Angeles)
 *                        for the zipcode, null if not found
 */
export default function zipToTz(zipcode: any): ("America/New_York" | "America/Chicago" | "America/Denver" | "America/Los_Angeles" | "America/Kentucky/Louisville" | "America/Indiana/Indianapolis" | "America/Detroit" | "America/Boise" | "America/Phoenix" | "America/Anchorage" | "Pacific/Honolulu" | "America/Indiana/Knox" | "America/Indiana/Winamac" | "America/Indiana/Vevay" | "America/Indiana/Marengo" | "America/Indiana/Vincennes" | "America/Indiana/Tell_City" | "America/Indiana/Petersburg" | "America/Menominee" | "America/Shiprock" | "America/Nome" | "America/Juneau" | "America/Kentucky/Monticello" | "America/North_Dakota/Center" | "America/Yakutat") | undefined;
