# Installation
`npm install` will install node deps and run gulp to get bower components and build JS and CSS.

# Architecture
* `server` contains server logic
* `client` contains client logic
* `static` contains static files that should be served by the server
* `static\dist` contains built JS and CSS
* `static\lib` contains bower components

# Tests
* `gulp test` launches Karma. All files in `client/**/*.test.js` are tested.
* `protractor protractor.conf.js` launches protractor (you will probably need to install protractor first). All files in `client/**/*.spec.js` are tested.

# Only angular?
1. remove `server/` and `server.js`
2. remove deps from `package.json`