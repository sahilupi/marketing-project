// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3200/api',
  domain: window.location.protocol + "//" +window.location.host,
  stripeKey: 'pk_test_51Mkl8USHSaj2D0AU1gNSXyfTaJEF8ED76yYPZfHD9hKVBCYZMqTbrOoD8QHtpkusdMqnwQYv9clrrTSDnYbvTCqq00Tphb5Q2v'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
