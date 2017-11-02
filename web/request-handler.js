var fs = require('fs');
var {headers} = require('./http-helpers');
var path = require('path');
var archive = require('../helpers/archive-helpers');

exports.handleRequest = function (req, res) {
  console.log('REQuest: ', req.method);
  if (req.url === '/') {
    var sitePath = archive.paths.siteAssets + '/index.html';
  } else {
    // this is the archived site
    var sitePath = archive.paths.archivedSites + req.url;
    // will need to modify how this is constructed if we
    // use it for sending back site for the POST request.
  }
  
  // if method === GET:
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
  
  if (req.method === 'POST') {
  // write to archive.paths.list
  // use a request listener to grab data
  // send back loading.html, and then the archived site
    // fs.appendFile(archive.paths.list, req.url)
    
  }
  
  // res.end(archive.paths.list); 
};
