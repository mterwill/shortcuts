var http = require('http');
var url  = require('url');
var fs   = require('fs');

const FILE = process.argv[2] || 'shortcuts.json';
const PORT = process.argv[3] || 8888;

/**
 * Serialize an object and write it back to disk.
 */
function writeFile(obj) {
  fs.writeFileSync(FILE, JSON.stringify(obj));
}

/**
 * Order an object's keys alphabetically.
 */
function alphabetizeKeys(obj) {
  const ordered = {};
  Object.keys(shortcuts).sort().forEach(function (key) {
    ordered[key] = shortcuts[key];
  });

  return ordered;
}

/**
 * Read shortcuts in from a JSON file before starting up the server, keep a copy
 * in memory, writing back to disk whenever a shortcut is updated.
 */
try {
  var shortcuts = JSON.parse(fs.readFileSync(FILE));
} catch (e) {
  // Start with an empty object by default and it'll get written back on change.
  var shortcuts = {}
}

http.createServer(function (request, response) {
  var parsed = url.parse(request.url, true);

  if (parsed.pathname === '/ls') {
    // List all shortcuts.
    response.write(JSON.stringify(alphabetizeKeys(shortcuts), null, 2));
  } else if ((parsed.pathname in shortcuts) && !('delete' in parsed.query)) {
    // Found shortcut, redirect.
    response.writeHead(302, { Location: shortcuts[parsed.pathname] });
  } else if ((parsed.pathname in shortcuts) && ('delete' in parsed.query)) {
    // Trying to delete an existing shortcut.
    delete shortcuts[parsed.pathname];
    writeFile(shortcuts);

    response.write('Shortcut deleted.');
  } else if ('url' in parsed.query) {
    // Trying to create a shortcut.
    shortcuts[parsed.pathname] = parsed.query.url;
    writeFile(shortcuts);

    response.statusCode = 201;
    response.write('Shortcut created.');
  } else {
    // Whoops. Nothing here.
    response.statusCode = 404;
    response.write('Not found.');
  }

  response.end();
}).listen(PORT);

console.log('Server is listening');
