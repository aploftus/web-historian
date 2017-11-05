var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

exports.paths = {
  // shorthand ways of writing pathnames to our home dir
  siteAssets: path.join(__dirname, '../web/public'),
  // archive folder
  archivedSites: path.join(__dirname, '../archives/sites'),
  // list of url to archive
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, {encoding: 'utf8'}, (err, sites) => {
    if (!err) {
      callback(sites.split('\n'));
    } else {
      console.log(err);
    }    
  });
};

exports.isUrlInList = function(url, callback) { 
  exports.readListOfUrls((sites) => {
    callback(sites.includes(url));
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url + '\n', () => callback());
};

exports.isUrlArchived = function(url, callback) {
  var path = exports.paths.archivedSites + '/' + url;
  fs.access(path, (err) => {
    callback(!err);
  });
};

exports.downloadUrls = function(urlArray) {
  // should download all pending urls in the list
  urlArray.forEach((url) => {
    // don't yet worry about if a site is already archived
    // just replace with fresh copy
    var writeStream = fs.createWriteStream(exports.paths.archivedSites + '/' + url);
    request('http://' + url).pipe(writeStream);
  });
};
