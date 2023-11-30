/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const IMPORT_SCRIPTS = `if(self.trustedTypes&&self.trustedTypes.createPolicy){constescapeScriptURLPolicy=self.trustedTypes.createPolicy('workerPolicy',{createScriptURL:url=>url});importScripts();}else{importScripts();}`;

/**
 * Examples:
 * - __DEV__ = 0;
 * - __DEV__=1;typeof window === 'object' && Object.defineProperty(window,'__DEV__',{set(){},get(){return 1}});
*/
export function validateDevSnippet(
  devSnippet: string,
): [true] | [false, string] {
  if (
    devSnippet !== '__DEV__=0;' &&
    devSnippet !==
      "__DEV__=1;typeof window === 'object' && Object.defineProperty(window,'__DEV__',{set(){},get(){return 1}});"
  ) {
    return [false, `Expected a valid dev snippet, but got '${devSnippet}'`];
  }

  return [true];
}

/**
 * Example:
 *
 * self.__swData = {};
 * self.__swData["SiteData"] = {
 *   "revision": 1010041348,
 *   "log_errors": false,
 * };
 */
export function validateData(swData: string): [true] | [false, string] {
  swData = swData.replace('self.__swData={};', '');
  const chunks = swData.split('self.__swData');

  const first = chunks.shift();
  if (first !== '') {
    return [false, `Invalid first element in swData: '${first}'`];
  }

  for (const chunk of chunks) {
    const assignment = chunk.search(/=/g);
    const key = chunk.substring(0, assignment).trim();
    try {
      JSON.parse(key);
    } catch (e) {
      return [false, `Invalid key: '${key}'`];
    }

    const value = chunk.slice(assignment + 1, -1).trim();
    try {
      JSON.parse(value);
    } catch (e) {
      return [false, `Invalid value: '${value}'`];
    }
  }

  return [true];
}

/**
 * Example:
 *
 * if (self.trustedTypes && self.trustedTypes.createPolicy) {
 *     const escapeScriptURLPolicy = self.trustedTypes.createPolicy('workerPolicy', {
 *         createScriptURL: url=>url
 *     });
 *     importScripts(escapeScriptURLPolicy.createScriptURL("https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yn\/r\/ * QkOQBPKdt5A.js?_nc_x=YrTKkug4veN"));
 * } else {
 *     importScripts("https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yn\/r\/QkOQBPKdt5A.js?_nc_x=YrTKkug4veN");
 * }
 */
export function validateImportScripts(
  imports: string,
): [true] | [false, string] {
  imports = imports.replace(
    /escapeScriptURLPolicy.createScriptURL\(\"[^\)]*\"\)/,
    '',
  );
  imports = imports.replace(/importScripts\(\"[^\)]*\"\)/, 'importScripts()');

  if (imports !== IMPORT_SCRIPTS) {
    return [
      false,
      `
Expected to see:
${IMPORT_SCRIPTS}
but got:
${imports}
`,
    ];
  }

  return [true];
}

export function validateServiceWorkerScript(
  script: string,
): [true] | [false, string] {
  script = script.replace(/\s/g, '');

  const startOfData = script.search(/self.__swData/g);
  if (startOfData === -1) {
    return [false, `Could not find any data declaration`];
  }

  const startOfImportScripts = script.search(/if\(self.trustedTypes/g);
  if (startOfImportScripts === -1) {
    return [false, `Could not find any imports declaration`];
  }

  // These ranges need to be inclusive in order to guarantee we're validating
  // the entirety of the script.
  const devSnippet = script.substring(0, startOfData).trim();
  const swData = script.substring(startOfData, startOfImportScripts);
  const importScripts = script.substring(startOfImportScripts);

  for (const value of [
    validateDevSnippet(devSnippet),
    validateData(swData),
    validateImportScripts(importScripts),
  ]) {
    if (!value[0]) {
      return [false, value[1]];
    }
  }

  return [true];
}
