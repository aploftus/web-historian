var fs = require('fs');
var {headers} = require('./http-helpers');
var path = require('path');
var archive = require('../helpers/archive-helpers');

exports.handleRequest = function (req, res) {
  if (req.url === '/') {
    var sitePath = archive.paths.siteAssets + '/index.html';
  } else {
    var sitePath = archive.paths.archivedSites + req.url;
  }
  
  if (sitePath) {
    fs.readFile(sitePath, (err, data) => {
      if (!err) {
        res.writeHead(200, headers);
        res.end(data);
      } else {
        res.writeHead(404, headers);
        res.end();
      }
    });
  }
  // res.end(archive.paths.list); 
};
