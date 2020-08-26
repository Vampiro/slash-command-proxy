# Mattermost Slash Command Proxy (MSCP)

Proxies Mattermost Slash Commands (MSCs) and formulates useful responses.

# Running the app

## Environment variables

`PORT` (optional) is the port the server will run on.

## Building & running the docker container

```bash
# to run locally
docker build --tag $USER/mm-slash-commands .
docker run --name mm-slash-commands -d -p 80:80 $USER/mm-slash-commands
```

## Automatic deployment

A [GitHub Action](.github/workflows/main.yml) has been set up to deploy to [Heroku](https://mm-slash-commands.herokuapp.com/) with each push to the `master` branch.
