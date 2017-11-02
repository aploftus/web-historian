var fs = require('fs');
var headers = require('./http-helpers');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url'); // native url module

exports.handleRequest = function (req, res) {
  var statusCode = 200;
  // console.log(req.url);
  var urlPath = url.parse(req.url).pathname;
  var indexPath = archive.paths.siteAssets + '/index.html';
  // url.parse parses the request url and grab pathname property off parsed url obj
  
  if (urlPath === '/') {  
    // var index = fs.open(archive.paths.siteAssets + '/index.html', 'r', (err, fd) => {
      // console.log('ERROR : ', err, fd);
      // return fd;
      // file description: position in memory
    // });
    // console.log('------ ', index.read());
    
    // fs.open(indexPath, 'r', (err, fd) => {
    //   res.end(JSON.stringify(fs.read(fd)));
    // });
    
    fs.readFile(indexPath, (err, data) => {
      if (!err) {
        console.log('SUCCESS : ', data);
        res.writeHead(statusCode, headers.headers);
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
