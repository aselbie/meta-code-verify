# meta-code-verify 

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?color=white)](/LICENSE.md) [![Chrome Users](https://img.shields.io/chrome-web-store/users/llohflklppcaghdpehpbklhlfebooeog?label=Users&logo=Google%20Chrome&logoColor=yellow&color=blue)](https://chrome.google.com/webstore/detail/code-verify/llohflklppcaghdpehpbklhlfebooeog) [![Edge Users](https://img.shields.io/badge/dynamic/json?label=users&query=%24.activeInstallCount&logo=Microsoft%20Edge&logoColor=blue&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Fcpndjjealjjagamdecpipjfamiigaknk)](https://microsoftedge.microsoft.com/addons/detail/code-verify/cpndjjealjjagamdecpipjfamiigaknk) [![Firefox Users](https://img.shields.io/amo/users/code-verify?logo=Firefox&logoColor=orange)](https://addons.mozilla.org/en-US/firefox/addon/code-verify/) [![Build status](https://img.shields.io/github/actions/workflow/status/facebookincubator/meta-code-verify/tests.js.yml)](https://github.com/facebookincubator/meta-code-verify/actions/workflows/tests.js.yml)


Code Verify is an extension for verifying the integrity of a web page.

The idea is you can publish what JavaScript should appear on your site into a "manifest". The manifest consists of the hashes of all the JavaScript files in a given release. This browser extension can consume the manifest and verify that *only* that code executes, or else display a warning to the user.

## Installation

You can install Code Verify from the extension store of [Chrome](https://chrome.google.com/webstore/detail/code-verify/llohflklppcaghdpehpbklhlfebooeog), [Firefox](https://addons.mozilla.org/en-US/firefox/addon/code-verify/#:~:text=The%20new%20Code%20Verify%20is,inauthentic%20or%20has%20been%20modified.), or [Edge](https://microsoftedge.microsoft.com/addons/detail/code-verify/cpndjjealjjagamdecpipjfamiigaknk#:~:text=Code%20Verify%20will%20immediately%20alert,and%20hasn't%20been%20modified.). (Safari support coming soon)

### [Code of Conduct](https://code.fb.com/codeofconduct)

Meta has adopted a Code of Conduct that we expect project participants to adhere to. Please read [the full text](https://code.fb.com/codeofconduct) so that you can understand what actions will and will not be tolerated.

### License

Code Verify is [MIT licensed](./LICENSE.md).
