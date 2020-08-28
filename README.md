# <img align="right" src="./client/public/logo32.png" style="margin-top:4px"> Slash Command Proxy

Proxies Slash Commands from [Slack](https://slack.com/) and [Mattermost](https://mattermost.com/) and formulates useful responses.

## Using the app

Usage documentation is hosted in the [app](https://slash-command-proxy.herokuapp.com/help).

## Running the app

### Environment variables

`PORT` (optional) is the port the server will run on.

### Building & running the docker container

```bashv
# to run locally
docker build --tag $USER/slash-command-proxy .
docker run --name slash-command-proxy -d -p 80:80 $USER/slash-command-proxy
```

### Automatic deployment

A [GitHub Action](.github/workflows/main.yml) has been set up to deploy to Heroku with each change to the `master` branch.

## License

Slash Command Proxy is [MIT licensed](./LICENSE).
