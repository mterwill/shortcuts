# Shortcuts
A bare-bones Node.js bookmarking utility.

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
- There is no authentication/authorization. Anyone who can access the server can add/delete URLs.
- The backend consists of a JSON file written to disk on shortcut update. Set the location by changing the ``FILE`` constant.
- For quick access, consider aliasing to something short in ``/etc/hosts``.
