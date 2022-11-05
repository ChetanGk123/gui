/**
 * Default App Config
 *
 * ? TIP:
 *
 * Change app config based on your preferences.
 * You can also change them on each component basis. i.e `app/main/pages/authentication/auth-login-v1/auth-login-v1.component.ts`
 *
 * ! IMPORTANT: If the enableLocalStorage option is true then make sure you clear the browser local storage(https://developers.google.com/web/tools/chrome-devtools/storage/localstorage#delete).
 *  ! Otherwise, it will not take the below config changes and use stored config from local storage.
 *
 */

import { CoreConfig } from "./core/types";
import CoreConfigData from "../assets/config/config.data.json"

// prettier-ignore
export const coreConfig: CoreConfig = CoreConfigData
//   app: {
//     appName     : 'Vuexy',                                        // App Name
//     appTitle    : 'Vuexy - Angular 14+ Bootstrap Admin Template', // App Title
//     appLogoImage: 'assets/images/logo.svg',                  // App Logo
//   },
//   layout:{
//     enableLocalStorage: true,
//   }
// }
