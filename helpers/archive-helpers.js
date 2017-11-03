var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var archive = require('../helpers/archive-helpers');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  // __dirname: pwd
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

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  // webapp AND worker
  // should read urls from sites.txt
  // should invoke the callback on the sites.txt data (in an array format - split on newline)
  fs.readFile(exports.paths.list, (err, data) => {
    if (!err) {
      callback(data);
    } else {
      console.log(err);
    }    
  });
};

exports.isUrlInList = function(url, callback) {
  // webapp
  // should check if a url is in the list
  // first we should readListOfUrls
    // our readList callback would verify a match to return true
  // our isUrl callback would then be called on the boolean  
  exports.readListOfUrls((data) => {
    var urls = data.split('\n');
    callback(urls.includes(url));
  });
};

exports.addUrlToList = function(url, callback) {
  // should add a url to the list
  // should check isUrlInList. if not,
  exports.isUrlInList(url, fs.appendFile(archive.paths.list, url + '\n', callback));
};

exports.isUrlArchived = function(url, callback) {
  // webapp AND worker?
  // should report whether or not path to that site exists?
};

exports.archiveUrls = function(urls) {
  // worker
  // should check if a url is archived
};

exports.downloadUrls = function(urlArray) {
  // should download all pending urls in the list
};
