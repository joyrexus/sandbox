Quick demonstration of how to filter/transform newline-delimited JSON in unix-pipeline fashion.

Run `npm install` to install dependencies.

Try `filter.coffee < in.json` or ...

    cat in.json | filter.coffee | pretty.coffee 

... or ...

    URL='http://registry.npmjs.org/fence-filter'
    get.coffee $URL | filter.coffee

... or ...

    curl -s $URL | filter.coffee
