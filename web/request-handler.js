var fs = require('fs');
var {headers} = require('./http-helpers');
var path = require('path');
var archive = require('../helpers/archive-helpers');

exports.handleRequest = function (req, res) {
  var statusCode = 200;
  console.log('URL: ', req.url);
  
  if (req.url === '/') {
    var sitePath = archive.paths.siteAssets + '/index.html';
  } else {
    var sitePath = archive.paths.archivedSites + req.url;
  }
  
  if (sitePath) {
    fs.readFile(sitePath, (err, data) => {
      if (!err) {
        res.writeHead(statusCode, headers);
        res.end(data);
      } else {
        console.log('ERROR : ', err);
      }
    });
  }
  
  // if path is GET / => if URL path === /
  // then respond back with index.html in response.end()
    // paths.siteAssets
  
  
  // if path is GET, then return website content from archive
  // write to the head with statusCode and headers
  // write body, loading.html
    // once URL is archived, send back archived page
  
  // res.end(archive.paths.list); 
};
