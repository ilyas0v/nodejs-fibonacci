## Run project inside docker container

build the container image:  `docker-compose build` \
then run the built image: `docker-compose up` \
the app should be online on : `http://localhost:3000/`

## Testing

### Sending input

method: POST
endpoint: `http://localhost:3000/input`
body: `{"number": 10}`

### Getting output

method: GET
endpoint: `http://localhost:3000/output?ticket={ticketId}`
