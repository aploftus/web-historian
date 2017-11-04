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
  fs.appendFile(archive.paths.list, url + '\n', () => callback());
};

exports.isUrlArchived = function(url, callback) {
  var path = exports.paths.archivedSites + '/' + url;
  fs.access(path, (err) => {
    callback(!err);
  });
};

exports.archiveUrls = function(urls) {
  // worker
  // should check if a url is archived
};

exports.downloadUrls = function(urlArray) {
  // should download all pending urls in the list
};
