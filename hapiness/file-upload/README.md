Demo of multipart form/file uploading with `hapi.js`.


## Usage

    npm install
    npm run server

Then ...

    npm run test

... or try:

    curl --form file=@data.csv    \
         --form firstName=Melvin  \
         --form lastName=Mooney   \
         http://localhost:8080/submit

