# Slash Command Proxy

Proxies Slash Commands from [Slack](https://slack.com/) and [Mattermost](https://mattermost.com/) and formulates useful responses.

## Using the app

Usage documentation is hosted within the app, [here](https://slash-command-proxy.vercel.app/help).

## Running the app

### Environment variables

`REACT_APP_PROXY_DEV_DOMAIN` (development, build-time) When building the client, this variable will be used to make proxy requests/ build the Command URL when running with `npx vercel dev`.

### Building & running

```bash
npm install
npx vercel dev
```

The app should now be running at the location provided in the command output. The api is served at `/api`.

## Development

The front end was built with create-react-app and the backend is a Vercel serverless function.

By default, when you run with `npx vercel dev`, your proxy requests will be made against `localhost`, where the UI is hosted. You can change this behavior if you want to hit a different server by setting the environment variable `REACT_APP_PROXY_DEV_DOMAIN` to wherever you want (such as the production environment: https://slash-command-proxy.vercel.app). This project uses `dotenv`, so you can create a `.env` file for this:

```bash
# .env
REACT_APP_PROXY_DEV_DOMAIN=https://slash-command-proxy.vercel.app
```

## Automatic deployment

This application automatically deploys to Vercel on every push to the `master` branch.

## License

Slash Command Proxy is [MIT licensed](./LICENSE).
