// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // serverURL: 'http://aegis-serverok.loc/',
  serverURL: 'http://localhost:8002/',
  pdfFilePath: 'files/pdf/',
  imgFilePath: 'files/img/',
  recaptchaPublicKey: '6Lebi8wZAAAAAIBnqQzUohm0qT5NhiOoUOqQTzaK',
  telegramBotToken: '1194766142:AAFwo9I9jMNwXNr5hYmJ9icF154Sarlgpo8',
  telegramChatId: '-1001477233848',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
