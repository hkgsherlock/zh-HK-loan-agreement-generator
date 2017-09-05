const ghpages = require('gh-pages');
const path = require('path');

ghpages.publish('build', {push: false}, (err) => (err && console.log(err)));