# Mattermost Slash Command Proxy (MSCP)

Proxies Mattermost Slash Commands (MSCs) and formulates useful responses.

# Future usage

## Background

When you create a MSC, you must fill out a number of fields. Among them are:

- Request URL
- Command Trigger Word

When you run a custom MSC, Mattermost will send off an HTTP request to the Request URL. It will tack on additional parameters in the request (command: `/test hi there`):

```js
{
  channel_id: '${jumbled characters}',
  channel_name: '${channel name where you entered the slash command}',
  command: '/test',
  response_url: '${url to send later responses to .com}',
  team_domain: '${the team domain}',
  team_id: '${the team id}',
  text: 'hi there',
  token: '${token of client request (jumbled characters)}',
  trigger_id: '${jumbled characters}',
  user_id: '${jumbled character}',
  user_name: '${username in mattermost}'
}
```

Dev Note: In Koa, this will be part of the `ctx.query` object.

## Usage

You will set your Request URL to something like `https://mm-slash-commands.herokuapp.com?prx.url=$END_SERVER&prx.output=$SOME_TEXT`

Building these URLs can be a pain, so it is highly recommended that you use the Mattermost Slash Command Proxy UI to help build them.

In this URL, you will notice that it consists of the parameters `prx.url` and `prx.output`. These contain a special keyword that mean something special to the MSCP.

### Keywords

| Keyword  | Values                                                                                      |
| -------- | ------------------------------------------------------------------------------------------- |
| `prx.*`  | `*` is either `url` or `output`                                                             |
| `prxa.*` | `*` is a number (0-based) that represents a word's position after the Command Trigger Word. |
| `prxr.*` | `*` is any attribute in the result from the End Server.                                     |
| `mm.*`   | `*` is any of the additional params Mattermost tacked on to the MSC request:                |
|          | `channel_id`, `channel_name`, `command`, `response_url`, `team_domain`, `team_id`,          |
|          | `text`, `token`, `trigger_id`, `user_id`, `user_name`                                       |

### Proxied URL

The only required parameter that you must add to your Request URL is `prx.url` which is the URL of the End Server where the request will be sent via the MSCP. The URL can be formulated using any of the keywords below:

- `prxa.*`
- `mm.*`

Example: `http://fake-dice-roll.com?dType=((prxa.1))`

Notice that keywords get wrapped in double parentheses.

### Command trigger arguments

The `prxa.*` keyword refers to the arguments passed to the Command Trigger Word. The `*` is the 0-based index of the argument after the Command Trigger word.

So if you do something like this `/roll 20`, then `prxa.0` is `20`.

### Response attributes

The `prxr.*` keyword refers to the attributes in a JSON response from the End Server. These are useful for formulating your [Output](#output). So if the End server responds back with:

```json
{
  "answer": "Ask again later."
}
```

You would be able to formulate your output like `Magic 8 Ball says: ((prxr.answer))`.

### Output

If you add the `prx.output` parameter to the Request URL, you can format the text that will be displayed in Mattermost by the MSCP. If you do not send this parameter, the response from the End Server will be what is seen in Mattermost.

You can use any of the following MSCP keywords to help format the output displayed in Mattermost.

- `prxa.*`
- `prxr.*`
- `mm.*`

These must be wrapped in double parentheses, e.g. `((prxr.attr1))`. So you might have something like the following for your `prx.output`:

`Hello there ((mm.username)). The result of your query is ((prxr.result)).`

# Running the app

## Environment variables

`PORT` is the port the server will run on.

## Building & running the docker container

```bash
# to run locally
docker build --tag $USER/mm-slash-commands .
docker run --name mm-slash-commands -d -p 80:80 $USER/mm-slash-commands
```

## Automatic deployment

A [GitHub Action](.github/workflows/main.yml) has been set up to deploy to [Heroku](https://mm-slash-commands.herokuapp.com/) with each push to the `master` branch.
