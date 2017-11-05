// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');

// we have this just exist in the file, not in an exports
// because we run it via crontab from the command line
archive.readListOfUrls(archive.downnloadUrls);