## Cupcakes CRUD apis

## Try it with Docker
> **Step 1** - Install Docker
Follow instructions at https://docs.docker.com/engine/install/
> **Step 2** - `brew install make`

# run make help to see the targets
Available targets:

 - `make build`                builds the image
 - `make start`                start the service in docker container
 - `make test`                 run tests
 - `make lint`                 run tests
 - `make mongo`                start mongo container
 - `make help`                 Show this help

# steps to run
- `make build lint test`
- `make mongo`
- `make start`
-  http://localhost:3000/specs
- please test the apis from the swagger link
