var fs = require('fs');
var utils = require('./http-helpers');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');


var actions = {
  'GET': function(req, res) {
    var urlPath = url.parse(req.url).pathname;
    if (urlPath === '/') { urlPath = '/index.html'; }
    utils.serveAssets(res, '/' + urlPath);
  },

  'POST': function(req, res) {
    utils.collectData(req, function(data) {
      var url = data.split('=')[1];
      console.log('POST URL ', url);
      archive.isUrlInList(url, function(inList) {
        if (inList) {
          archive.isUrlArchived(url, function(exists) {
            if (exists) {
              utils.serveAssets(res, url);
            } else {
              utils.sendRedirect(res);
            }
          });
        } else {
          archive.addUrlToList(url, function() {
            utils.sendRedirect(res);
          });
        }
      });
    });
  }
};

exports.handleRequest = function (req, res) {
  if (actions[req.method]) {
    actions[req.method](req, res);
  } else {
    utils.send404(res);
  }
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
