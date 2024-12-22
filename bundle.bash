#!/bin/bash
# For now, the dist is the same as the site
# But as JS and whatnot are added, this will do the needful :)
#* Always triple-check end-to-end deployment after changing this script!
mkdir -p dist
cp -r site/* dist
