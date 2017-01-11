# Shortcuts
A bare-bones Node.js bookmarking utility.

    node shortcuts.js

## Usage
To create a new shortcut:

    example.org/google?url=https://www.google.com
  
Also supports nesting:

    example.org/google/maps?url=https://maps.google.com

You can now access your newly created shortcuts!

    example.org/google
    example.org/google/maps

To delete one:

    example.org/google?delete
    
To list all:

    example.org/ls


## Notes
- There is no authentication/authorization. Anyone who can access the server can
  add/delete URLs.
- The backend consists of a JSON file written to disk on shortcut update. The
  file is `shortcuts.json` by default, which can be customized by passing
  `argv[2]`.
- The server listens on port `8888` by default. This can be customized by
  passing `argv[3]`.
- For quick access, consider aliasing to something short in `/etc/hosts`, `go`
  on my machine.
