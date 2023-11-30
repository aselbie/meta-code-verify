/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import { jest } from '@jest/globals';
import { validateServiceWorkerScript } from '../content/validateServiceWorkerScript';

const fixture = `
__DEV__ = 0;
self.__swData = {};
self.__swData["SiteData"] = {
    "revision": 1010041348,
    "log_errors": false,
    "fbRevHeader": "X-FB-Rev",
    "fbDynSpinExpHeader": "x-fb-dyn-spin-exp",
    "disableSWHeader": "x-service-worker-disable",
    "siteTypeHeader": "x-fb-site-type",
    "siteType": null,
    "nonceHeader": "x-fb-nonce",
    "liteVersionHeader": "x-fb-lite-version",
    "current_user": 31600418,
    "expire_time": 1701219600000
};
self.__swData["ConsolidatedHeader"] = {
    "key_names": {
        "SW_SVN": "r",
        "SW_BACKGROUND_WORK": "b",
        "SW_PARTIAL_CACHE": "p",
        "SW_SR_PINNING": "k",
        "CLIENT_CHROME_DYNAMIC_METADATA": "m",
        "SW_ROUTES": "o",
        "SW_SR_PINNING_DYN_REQ": "a",
        "SW_SR_PINNING_EXPECTED_TTL": "t",
        "SW_SKIP_REV_CHECK": "s",
        "SW_SPLASH_SCREEN_ENABLED": "l",
        "SW_SITE_TYPE": "y",
        "SW_NONCE": "n",
        "SW_BUNDLE_VERSION": "v"
    },
    "header_name": "x-service-worker-consolidated-request"
};
self.__swData["CacheResponseTypes"] = {
    "response_types": {
        "FULL": 1,
        "CACHE": 2,
        "DYNAMIC": 3,
        "EF_ONLY": 4,
        "NO_CACHE": 5
    },
    "response_header": "x-service-worker-response-type"
};
self.__swData["SWRoutes"] = {
    "routeVersions": "h2",
    "routes": {
        "HomePage": {
            "name": "HomePage",
            "regex": "^(\\\/|\\\/home.php)?$",
            "version": 2,
            "cache_path": "home.php",
            "whitelisted_params": []
        }
    },
    "globalLists": {
        "blacklist": ["quickling", "ajaxpipe"],
        "whitelist": ["ref", "__mref", "sw_fnr_id", "artillery_sample", "spin_reset", "no_dev_console", "showlog", "_rdr", "refsrc", "soft", "refid"]
    },
    "bypassParams": ["hash", "sig", "_fb_curl_hash", "_fb_batch_sig", "_nc_hash"]
};
self.__swData["GenericNotificationData"] = {
    "enabled": true,
    "appid": 1443096165982425,
    "title": "Facebook",
    "message": "You have new notifications.",
    "pic": "https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yN\/r\/5sXWuBgjYhv.png",
    "uri": "\/notifications",
    "dir": "ltr",
    "use_notif_id_as_tag": false,
    "badge": "\/images\/assets_DO_NOT_HARDCODE\/facebook_icons\/app-facebook-circle_filled_48_primary-button-icon.png",
    "should_log_event_lifecycle": false
};
self.__swData["WebAppBadge"] = {
    "enabled": false
};
self.__swData["BrowserPaymentHandler"] = {
    "enabled": false
};
self.__swData["BackgroundRequestsData"] = {
    "register_listener": false
};
self.__swData["WidgetServerData"] = {
    "enabled": true
};
self.__swData["PreloadData"] = {
    "enabled": true
};
if (self.trustedTypes && self.trustedTypes.createPolicy) {
    const escapeScriptURLPolicy = self.trustedTypes.createPolicy('workerPolicy', {
        createScriptURL: url=>url
    });
    importScripts(escapeScriptURLPolicy.createScriptURL("https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yn\/r\/QkOQBPKdt5A.js?_nc_x=YrTKkug4veN"));
} else {
    importScripts("https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yn\/r\/QkOQBPKdt5A.js?_nc_x=YrTKkug4veN");
}`;


describe('validateServiceWorkerScript', () => {
  beforeEach(() => {});
  it('Valid due to script-src', () => {
    const [valid, reason] = validateServiceWorkerScript(fixture);
    expect(reason).toBeUndefined();
  });
});
