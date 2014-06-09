curl http://localhost:8000/hello/names
# [["jason","voigt"],["robin","weiss"]]

curl -X POST -H "Content-Type: application/json" -d '{"first": "Jane", "last": "Doe"}' http://localhost:8000/hello

curl http://localhost:8000/hello/names
# [["jason","voigt"],["robin","weiss"]]

curl -X DELETE http://localhost:8000/hello/0
# true

curl http://localhost:8000/hello/names
# [["robin","weiss"]]


