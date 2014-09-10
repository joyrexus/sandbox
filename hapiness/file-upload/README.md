Demo of multipart form/file uploading with `hapi.js`.


## Usage

    npm install
    npm run setup
    npm run server

Then ...

    npm run test

... or try:

    curl --form file=@data.csv    \
         --form firstName=Melvin  \
         --form lastName=Mooney   \
         http://localhost:8080/submit


## See also

Other `multipart/form-data` demos:

* [hapi](https://github.com/joyrexus/multipart-demo) - serving various upload clients
* [http](https://github.com/Raynos/http-framework/blob/master/examples/multipart/server.js) - sans framework
* [express](https://github.com/strongloop/express/blob/master/examples/multipart/index.js)
