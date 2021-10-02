# Slash Command Proxy

Proxies Slash Commands from [Slack](https://slack.com/) and [Mattermost](https://mattermost.com/) and formulates useful responses.

## Using the app

Usage documentation is hosted [here](https://slash-command-proxy2.vercel.app/help).

## Running the app

### Environment variables

`PORT` (optional, runtime) You can change the port that the server will run on with this variable (default: 80). You can also change the port that the client will run on when in development mode with this variable. Don't set them to be the same.

`REACT_APP_PROXY_DEV_DOMAIN` (development, build-time) When building the client, this variable will be used to make proxy requests/ build the Command URL when running with `npm start`.

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

#### Build & run the server code

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

By default, when you run with `npm start`, your proxy requests will be made against https://slash-command-proxy2.vercel.app. You can change this behavior (like if you want to test changes you've made to the server code) by setting the environment variable `REACT_APP_PROXY_DEV_DOMAIN` to wherever you want (like localhost). This project uses `dotenv`, so you can create a .env file for this:

```bash
# client/.env
REACT_APP_PROXY_DEV_DOMAIN=http://localhost
```

_Note: you must run `npm start` again after you change an environment variable._

##### Server

The server side depends on the client side already having been built with its artifacts in the `client/build` directory. To develop server code, you can run `npm run dev` which will run the server in a development mode.

Documentation (TypeDoc) can be generated with `npm run docs`. Point your browser to `server/docs/index.html`.

### Automatic deployment

This application automatically deploys to Vercel on every push to the `master` branch.

## License

Slash Command Proxy is [MIT licensed](./LICENSE).
