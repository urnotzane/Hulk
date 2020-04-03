const fs = require('fs');
const path = require('path');

module.exports = function(callback) {
  fs.readFile(path.resolve(__dirname, '../config/development.json'), 'utf8', function(err, data) {
    if (err) {
      throw new Error(err);
    }
    callback(JSON.parse(data));
  })
}