// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  base_url: 'https://marketoo-api-service.azurewebsites.net/api/',
  signlr_base_url: 'https://marketoo-api-service.azurewebsites.net/',
  // base_url: 'http://localhost:5000/api/',
  // signlr_base_url: 'http://localhost:5000/',
  firebase: {
    apiKey: "AIzaSyBkGEkMCEwJNfFyMHJB4D8l6499cruxtH0",
    authDomain: "marketoo-76413.firebaseapp.com",
    databaseURL: "https://marketoo-76413.firebaseio.com",
    projectId: "marketoo-76413",
    storageBucket: "marketoo-76413.appspot.com",
    messagingSenderId: "344155998799",
    appId: "1:344155998799:web:e028a6c13d165af5ff383a",
    measurementId: "G-MDYQZ4N9D6"
  },
  instagram_token: 'IGQVJYSmQ5WVFrNlhPT2ZAKSVNrM1cyREY3RTI3SXlSOWUtTEZAQZAGdHbXVoVjE5SW5GZA3pjVkNoWVBfbHdid2FFcFhoV1lzdUVoSWpZANkZAEZADJ0LUVYX0FYUjRNWmlfWk9JSjlfWTZALbXlCTl83NWdKNgZDZD',
  stripe_token: 'pk_test_51HDmTuFbF7KqjBXsyYrOWgz1DZfeynJPaFwTeUpC6aPsRCOgrZMLM55YlrR0hwNnIKQT4lYsK0lTgRZHfrx4KjtG00UfpijMRg',
  paypal_token: 'PAYPAL_CLIENT_ID',
  // our server key
  push_notification_public_key: "BGcyc-_QabAQ0yYUnSiSzHKy5K2vZueQIU1JZzswP9XuXRimVv5OWGEP8KccL0wu70jNgHGbTiWGa08bXIabYAo",
  push_notification_private_key: "2FzAHrZuhdRqcrz2YEw3OtlHtUYXkldS1jiTQNEIz5w"

  // thrid party keys
  // push_notification_public_key: "BEL-PlobPLNDtSgeSfWMDREgreG0lfEBzfJIU0R3OPpz74mS5FdbFj-u-rlN2p8GRkNohOT6hfJSyDHHUSyMJq8",
  // push_notification_private_key: "QExN-QLAmVlPfcVTkodrjyUGf_Y_QUawfsFK0IIz27w"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
