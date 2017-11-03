var fs = require('fs');
var httpHelpers = require('./http-helpers');
var path = require('path');
var archive = require('../helpers/archive-helpers');

exports.handleRequest = function (req, res) {
  if (req.url === '/') {
    var sitePath = archive.paths.siteAssets + '/index.html';
  } else {
    var sitePath = archive.paths.archivedSites + req.url;
  }
  
  // httpHelpers.serveAssets(res, sitePath, () => {
  //   fs.readFile(sitePath, (err, data) => {
  //     if (!err) {
  //       return data
  //       // res.writeHead(200, httpHelpers.headers);
  //       // res.end(data);
  //     } else {
  //       res.writeHead(404, httpHelpers.headers);
  //       res.end();
  //     }
  //   });
  // });
  
  if (req.method === 'GET' && sitePath) {
    fs.readFile(sitePath, (err, data) => {
      if (!err) {
        res.writeHead(200, httpHelpers.headers);
        res.end(data);
      } else {
        res.writeHead(404, httpHelpers.headers);
        res.end();
      }
    });
  }
  
  if (req.method === 'POST') {
    // if user submits an already archived page
    // auto-redirect to archived version of that page
    // or to loading.html if the page has not yet been loaded
    
    var body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    
    req.on('end', () => {
      console.log(body.hostname);
      archive.addUrlToList(body.slice(4), (err) => {
        if (err) {
          console.log(err);
          throw err;
        }
        // I think this is happening asynchronously
        // because it's not logging an error, it's simply not
        // appending in time for the test to finish. hmm.
      });
    });
      
    res.writeHead(302, httpHelpers.headers); // is statusCode 302?
    res.end();
    
      
    /* 
      app.post('/', function(req, res) {
        res.redirect(statusCode, /pathToRedirect);
        
        is statusCode === 302?      
      });
    */
  }
  
  // console.log('URL: ', req.url);
  // write to archive.paths.list
  // use a request listener to grab data
  // send back loading.html, and then the archived site
    
  
  
  // res.end(archive.paths.list); 
};


// serveAssets (from http-helpers.js) should be able to do 
// the giving back of index.html

// when we receive a GET request:
// if req.url is '/',
//     serve back index.html
// if req.url is sitePath
//     serve up said site from path
// when we receive POST request:
// parse url from body
// if url not already in list, 
//     add to list
//     serve up Loading.html asset in 302
//         add event to queue to make sure we send back real page
//             once we have it?
// if url is in list,
//     if url is archived,
//         serve up URL asset (status code?)
//     if not, serve up Loading.thml asset in 302
//         add event to queue to make sure we send back real page
//             once we have it?
// At regular intervals (cron),
//     web worker should Read list of URLs
//     if url archived, skip it
//     if not, archive URL (via scraping)
//     notify webapp that we have archived a page?
