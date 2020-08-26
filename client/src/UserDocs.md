# Slash Command Proxy

In the chat clients [Slack](https://slack.com/) and [Mattermost](https://mattermost.com/), you can create Slash Commands that allow you to do things like:

You: `/roll 20`

Bot: "You rolled a 16!"

Behind the scenes, your command triggers a `GET` or `POST` to a **Command URL** you specify in advance along with any arguments you include in the command.

Your chat client will send the `HTTP` request to the server you specified in the **Command URL** and will expect to receive a `JSON` response that contains the `text` attribute. This is where the **Slash Command Proxy** can help out.

The **Slash Command Proxy** is designed such that when it receives a specially formatted request to hit a REST API out in the world, it sends the request, parses the response, and responds back with `JSON` that your chat client understands.

## Creating a Slash Command

Follow the instructions for creating a Slash Command

- [Instructions](https://api.slack.com/tutorials/your-first-slash-command) for Slack

- [Instructions](https://docs.mattermost.com/developer/slash-commands.html) for Mattermost

In either chat client, you'll be presented with a form that contains a couple of key fields.

- **Command Word** is what you use to trigger the command. e.g. `roll`

- **Command URL** is the URL for the server you want the request to go to.

### Using the Slash Command Proxy

The **Slash Command Proxy** accepts an HTTP `GET` request on the `/proxy` endpoint containing parameters for:

1. The **Destination URL** of the REST API that you want to hit.
2. An optional **Output Template** for what to show in your chat client as a response.

Because both of these are sent as parameters to the **Slash Command Proxy**, all of the text within will have to be encoded URI components. This would be not-so-great for a human to have to type themselves.

The Command Creator tool helps you formulate the **Command URL** that you will specify in your chat client when you set up the Slash Command. The **Command URL** contains both the **Destination URL** as well as the optional **Output Template**.

### Destination URL

The **Destination URL** is where you want the request to actually go. In our dice rolling example, I actually want to hit an API that will give back a simulated dice roll. Using [DiceAPI](http://roll.diceapi.com/), you can request an n-sided die roll by hitting this url: http://roll.diceapi.com/json/d20

In the **Slash Command Proxy**, http://roll.diceapi.com/json/d20 would be your **Destination URL**. The DiceAPI responds back with JSON in this form:

```JSON
{
  "success":true,
  "dice":[
    {"value":16,"type":"d20"}
  ]
}
```

Your chat client expects a response where any text you want in chat should come in the `text` attribute, so we need to tell the **Slash Command Proxy** how to put text within the `text` attribute. This is where the **Output Template** comes in.

### Output Template

The **Output Template** needs to be able to retrieve information from within the response. In our dice rolling example, we want to get at the `value` attribute that is nested within the `JSON` response from DiceAPI. In the **Slash Command Proxy**, we have access to certain variables by wrapping the variable in `${}`, e.g. `${variable}`. Anything within the `JSON` response from our **Destination Server** is available in an object called `res`.

So with the `JSON` we received from the DiceAPI, our variable would need to be `${res.dice[0].value}`. So to create the **Output Template** for our dice roll, we would have "You rolled a \${res.dice[0].value}!"

In this example, we're always rolling a 20-sided die. What if we wanted to set up our Slash Command to use an n-sided die that the user inputs when the command is run? This is where the **Args** variable comes in.

_Note: The Output Template accepts Markdown formatting._

### Args

Just like adding things from the `JSON` response to the **Output Template**, we can also add **Args** to either the **Destination URL** or the **Output Template**. **Args** end up as a string[] variable.

Continuing with the dice roll example, we would like to send along a number with the DiceAPI request: http://roll.diceapi.com/json/d20

Using **Args**, we can send along user input along with the request: http\://roll.diceapi.com/json/d\${args[0]}

### Command Creator

So to put it all together, we would go to the Slash Command Creator tool and enter:

1. **Destination URL**: http\://roll.diceapi.com/json/d\${args[0]}
2. **Output Template**: You rolled a \${res.dice[0].value}!

We copy the contents of **Command URL** and paste them into the URL in our chat client where we are creating the Slash Command. Then in our chat, we can type `/roll 20` and get back the results of a 20-sided die roll. `/roll 6` would give us results for a 6-sided die roll.

### Variables

| Variable   | Values                                                                                          |
| ---------- | ----------------------------------------------------------------------------------------------- |
| `args[#]`  | `#` is a number (0-based) that represents a word's position after the Command's trigger word.   |
| `res.*`    | `*` is any attribute in the response from the **Destination Server**.                           |
| `client.*` | `*` is any of the additional params the chat client has tacked on to the Slash Command request: |
|            | `channel_id`, `channel_name`, `command`, `response_url`, `team_domain`, `team_id`,              |
|            | `text`, `token`, `trigger_id`, `user_id`, `user_name`                                           |
