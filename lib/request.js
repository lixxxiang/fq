'use strict';

var _require = require('./const'),
    githubHost = _require.githubHost,
    githubHeaders = _require.githubHeaders;

function request(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  url += '?_t=' + Date.now();
  var URL = require('url');
  var urlObj = URL.parse(url);
  if (urlObj.hostname === githubHost) {
    options.headers = githubHeaders;
  }

  var _require2 = require(urlObj.protocol.slice(0, -1)),
      getData = _require2.get;

  return new Promise(function (resolve, reject) {
    getData(Object.assign(options, urlObj), function (res) {
      res.setEncoding('utf8');
      if (res.statusCode !== 200) {
        reject(res.statusCode);
        res.resume();
        return;
      }
      var data = "";
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on("end", function () {
        resolve(data);
      });
    }).on("error", function (e) {
      reject(e);
    });
  });
}

exports.request = request;