var http = require('http');
var url  = require('url');
var fs   = require('fs');

const FILE = 'shortcuts.json';
const PORT = 8888;

var shortcuts;

var server = http.createServer(function(request, response) {
    var parsed = url.parse(request.url, true);

    if ((parsed.pathname in shortcuts) && !('delete' in parsed.query)) {
        // Found shortcut, redirect.
        response.writeHead(301, { Location: shortcuts[parsed.pathname] });

    } else if ((parsed.pathname in shortcuts) && ('delete' in parsed.query)) {
        // Trying to delete an existing shortcut.
        delete shortcuts[parsed.pathname];
        fs.writeFileSync(FILE, JSON.stringify(shortcuts));

        response.write('Shortcut deleted.');

    } else if ('url' in parsed.query) {
        // Trying to create a shortcut.
        shortcuts[parsed.pathname] = parsed.query.url;
        fs.writeFileSync(FILE, JSON.stringify(shortcuts));

        response.statusCode = 201;
        response.write('Shortcut created.');

    } else {
        // Whoops. Nothing here.
        response.statusCode = 404;
        response.write('Not found.');
    }

    response.end();
});

fs.readFile(FILE, (err, data) => {
  if (err) {
      shortcuts = { };
  } else {
      JSON.parse(fs.readFileSync(FILE));
  }

  server.listen(PORT);
  console.log('Server is listening');
});