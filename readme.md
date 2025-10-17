# [markwiemer.com](https://markwiemer.com)

My personal site hosting my articles, pictures of my dog, and other stuff I like 😊

## Getting started

Pre-requisites:

- `fnm` or a similar tool to install modern versions of Node

1. `fnm use 22` (or whatever command you use to ensure you're using Node 22)
1. `npm i`
1. `npm run build` to include the `pages` folder
1. `npm start` to preview the site

`http://localhost:8080` should now host a local version of the site :) (not `https`)

Empty cache and hard refresh browser on changes to ensure you're getting the latest version.

## Developer notes

General notes:

- Some pages are tracked directly in the `site` folder, others are in the `pages` folder

Hosting tools:

- GitHub Pages
- namecheap.com

Developer tools:

- @types/node to silence false positive errors on references to Node globals
- Git LFS to better track changes to images
- GitHub Actions to automatically deploy the site
- http-server for testing the site
- Node.js to run QoL scripts
- Prettier to format the repo
- See `package.json` files for details
