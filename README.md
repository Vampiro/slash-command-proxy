# Slash Command Proxy<br/>[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Vampiro/slash-command-proxy/blob/master/LICENSE) [![CI](https://github.com/Vampiro/slash-command-proxy/workflows/CI/badge.svg)](https://github.com/Vampiro/slash-command-proxy/actions?query=workflow%3ACI)

Proxies Slash Commands from [Slack](https://slack.com/) and [Mattermost](https://mattermost.com/) and formulates useful responses.

## Using the app

Usage documentation is hosted in the [app](https://slash-command-proxy.herokuapp.com/help).

## Running the app

### Environment variables

`PORT` (optional) is the port the server will run on. Defaults to 80.
`REACT_APP_PROXY_DEV_DOMAIN` (development) When building the client, this variable will be used to make proxy requests/ build the Command URL when running with `npm start`.

### Building & running the docker container

```bash
# to run locally
docker build --tag test/slash-command-proxy .
docker run --name slash-command-proxy -d -p 80:80 test/slash-command-proxy
```

### Building & running with nodejs

#### Build the client code

```javascript
cd client
npm install
npm run build
```

#### Build the server code

```javascript
cd server
npm install
npm run build
npm start
```

The app should be running on localhost port 80 unless you specified another port in your `PORT` env.

#### Development

##### Client

This was made with create-react-app and uses its basic scripts. `npm start` is sufficient to run the client on its own in a development mode.

By default, when you run with `npm start`, your proxy requests will be made against http://slash-command-proxy.herokuapp.com. You can change this behavior (like if you want to run against changes you've made in your server) by setting the environment variable `REACT_APP_PROXY_DEV_DOMAIN` to wherever you want (like localhost). This project uses `dotenv` so you can create a .env file for this:

```bash
# client/.env
REACT_APP_PROXY_DEV_DOMAIN=localhost
```

_Note: you must run `npm start` again after you change an environment variable._

##### Server

The server side depends on the client side already having been built with its artifacts in the `client/build` directory. To develop server code, you can run `npm run dev` which will run the server in a development mode.

### Automatic deployment

A [GitHub Action](.github/workflows/ci.yml) has been set up to deploy to Heroku with each change to the `master` branch.

## License

Slash Command Proxy is [MIT licensed](./LICENSE).
