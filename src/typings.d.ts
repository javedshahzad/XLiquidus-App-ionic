export {};

//
// typings.d.ts - minimal non-invasive shims for the test/build environment.
// This file intentionally avoids declaring any symbols that library typings
// already provide (no InAppBrowser classes/consts). It only adds:
// - a Window augmentation (for runtime overrides)
// - a permissive wildcard module for native packages to avoid missing-module errors
//

/* make this file a module */
export {};

declare global {
  interface Window {
    __APP_ENV?: any;
    __APP_HTTP_CONFIG?: any;
  }
}

/* Generic permissive module for ionic-native packages used as providers in tests/builds.
   Export a permissive any so tests and the compiler do not fail when native implementations
   are not available in the test environment. Do NOT declare concrete class/const names
   that may conflict with the library .d.ts files (e.g., InAppBrowser). */
declare module '@ionic-native/*/ngx' {
  const _any: any;
  export default _any;
}

declare module '@ionic-native/in-app-browser/ngx' {
  /**
   * Export a lightweight type alias for InAppBrowser so application code that
   * imports the value from the library can also use it in type positions
   * without TypeScript complaining ("value used as type").
   *
   * This is intentionally a type-only alias (no value/class declaration) to
   * avoid duplicating or conflicting with the library's runtime exports.
   */
  export type InAppBrowser = any;
}
