// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	firebase: {
		apiKey: "AIzaSyA1Qn1Queo7vsUGsSGY44HFgNG8KuXFjhw",
		authDomain: "geocaching-16daa.firebaseapp.com",
		databaseURL: "https://geocaching-16daa.firebaseio.com",
		projectId: "geocaching-16daa",
		storageBucket: "geocaching-16daa.appspot.com",
		messagingSenderId: "721604754645"
	},
	google_key: "AIzaSyAWEQl0gPjFVQ19MNWAWXWGZcTbROzbaio"
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
