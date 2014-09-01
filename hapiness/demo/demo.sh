#!/bin/sh

curl http://localhost:8000/hello/names
# [{"first":"jason","last":"voigt"},{"first":"robin","last":"weiss"}]

curl -X POST -H "Content-Type: application/json" -d '{"first": "Jane", "last": "Doe"}' http://localhost:8000/hello
# added {"first":"Jane","last":"Doe"}!

curl http://localhost:8000/hello/names
# [{"first":"jason","last":"voigt"},{"first":"robin","last":"weiss"},{"first":"Jane","last":"Doe"}]

curl -X DELETE http://localhost:8000/hello/0
# deleted {"first":"jason","last":"voigt"}!

curl http://localhost:8000/hello/names
# [{"first":"robin","last":"weiss"},{"first":"Jane","last":"Doe"}]
