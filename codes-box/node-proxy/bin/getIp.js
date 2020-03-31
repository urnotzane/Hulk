const interfaces = require('os').networkInterfaces();

module.exports = function () {
  for (var devName in interfaces) {
    var iFace = interfaces[devName];
    for (var i = 0; i < iFace.length; i++) {
      var alias = iFace[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}