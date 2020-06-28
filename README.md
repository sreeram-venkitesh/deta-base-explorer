# deta-base-explorer
A web dashboard to play around with your Deta Base

## Steps to run locally
* In order to use the Deta package in the client side, browserify has been used
* All the code that needs to be run in the browser is written in worker.js file and is 
  bundled into a bundle.js and that js file is linked in dashboard.ejs
* An you can create the bundle file automatically by running the npm script ```npm run build```
* After the bundle file has been created, you can ```npm start``` to start the server locally
* Make sure that the necessary lines are uncommented in index.js
(In order to host in deta, the code to setup localhost is replaced with module.exports)