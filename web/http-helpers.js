var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var utils = require('./http-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = (res, asset, callback) => {
  var encoding = {encoding: 'utf8'};
  // waterfall through scenarios
  // if asset is in public
  fs.readFile(archive.paths.siteAssets + asset, encoding, (err, data) => {
    if (err) { // if asset not in public
      fs.readFile(archive.paths.archivedSites + asset, encoding, (err, data) => {
        if (err) { // if asset not archived yet
          callback ? callback() : exports.send404(res);
        } else {
          exports.sendResponse(res, data);
        }
      });
    } else {
      exports.sendResponse(res, data);
    }
  });
};

exports.sendResponse = (response, data, statusCode) => {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, exports.headers);
  response.end(JSON.stringify(data));
};

exports.collectData = (request, callback) => {
  var data = '';
  request.on('data', (chunk) => {
    data += chunk;
  });
  request.on('end', () => {
    callback(data);
  });
};

exports.send404 = (response) => {
  exports.sendResponse(response, 'Page not found', 404);
};

exports.sendRedirect = (response) => {
  var loadingPath = archive.paths.siteAssets + '/loading.html';
  fs.readFile(loadingPath, {encoding: 'utf8'}, function(err, data) {
    if (!err) {
      exports.sendResponse(response, data, 302);
    }
  });
};