// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: 'https://api.github.com/graphql',
  firebase: {
    apiKey: 'AIzaSyDP6vwRfKcPqYptCiJpxi2h5EdY3eLFR10',
    authDomain: 'platzichallenges.firebaseapp.com',
    databaseURL: 'https://platzichallenges.firebaseio.com',
    projectId: 'platzichallenges',
    storageBucket: 'platzichallenges.appspot.com',
    messagingSenderId: '853497397437',
    appId: '1:853497397437:web:916f9e2f8b135b5c56f7d4',
    measurementId: 'G-T7VS6RH65R'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
