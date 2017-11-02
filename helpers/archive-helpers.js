var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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
};

exports.isUrlInList = function(url, callback) {
  // webapp
};

exports.addUrlToList = function(url, callback) {
  // webapp
};

exports.isUrlArchived = function(url, callback) {
  // webapp AND worker?
};

exports.archiveUrls = function(urls) {
  // worker
};
