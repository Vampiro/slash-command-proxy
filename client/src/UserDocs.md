# Mattermost Slash Command Proxy (MSCP)

In Mattermost, you can create Slash Commands that allow you to do things like:

You: `/roll 20`

Bot: "You rolled a 16!"

Behind the scenes, your command triggers a `GET` or `POST` to a **Request URL** you specify in advance along with any arguments you include in the command.

Mattermost will send the `HTTP` request to the server you specified in the **Request URL** and will expect to receive a `JSON` response that contains the `text` attribute. For simple REST APIs, this is where the MSCP can help out.

The MSCP is designed so that you can pass it a specially formulated set of params to hit a REST API out in the world and then parse out the response and put it into `JSON` that Mattermost understands.

# Creating a Slash Command

To set up a Slash Command in Mattermost, you go to `Main Menu` -> `Integrations` -> `Slash Commands` -> `Add Slash Command`

You'll be presented with a form that contains a few key fields.

**Command Trigger Word** is the command word. e.g. `roll`

**Request URL** is the URL for the server you want the request to go to.

**Request Method** `GET` or `POST`. The MSCP only accepts `GET` requests.

## Using the MSCP

The MSCP accepts a `GET` request on the `/proxy` endpoint containing parameters for:

1. The URL of the REST API that you want to hit.
2. (optional) An output template for what to show in Mattermost as a response.

Unfortunately, because both of these are sent as parameters to the MSCP, all of the text within will have to be encoded URI components. This would be not-so-great for a human to have to type themselves.

The Command Creator tool helps you formulate the request, **Mattermost's Request URL**, that you will send to the MSCP which contains both the **Destination URL** as well as the optional **Output Template**.

## Destination URL

The **Destination URL** is where you want the request to actually go. In our dice rolling example, I actually want to hit an API that will give back a [simulated dice roll](http://roll.diceapi.com/). Using DiceAPI, you can request an n-sided die roll by hitting this url: http://roll.diceapi.com/json/d20

In the MSCP http://roll.diceapi.com/json/d20 would be your **Destination URL**. The DiceAPI responds back with JSON in this form:

```JSON
{
  "success":true,
  "dice":[
    {"value":16,"type":"d20"}
  ]
}
```

Mattermost expects a response where any text you want in chat should come in the `text` attribute. So we need to tell the MSCP how to put text within the `text` attribute. This is where the **Output Template** comes in.

## Output Template

The **Output Template** needs to be able to retrieve information from within the response. In our dice rolling example, we want to get at the `value` attribute that is nested within the `JSON` response. In the MSCP, we have access to certain `variables` by wrapping the `variable` in parentheses, e.g. `((variable))`. For anything out of the `JSON` response, we start our `variable` off with `res`.

So with the `JSON` we received from the DiceAPI, our `variable` would be `((res.dice[0].value))`. So to bring it all together, your **Output Template** should be something like "You rolled a `((res.dice[0].value))`!"

In this example, we're always rolling a 20-sided die. What if we wanted to set up our Slash Command using an n-sided die that the user inputs when the command is run? This is where the **Args** `variable` comes in.

## Using Args

Just like adding things from the `JSON` response to the **Output Template**, we can also add **Args** to either the **Destination URL** or the **Ouput Template**. In our case, we would like to send along a number with the DiceAPI request.

In our **Request URL**, we had http://roll.diceapi.com/json/d20

Using **Args**, we can send along user input along with the request: http\://roll.diceapi.com/json/d((args[0]))

## Command Creator

So to put it all together, we would go to the MSCP Command Creator tool and enter:

1. **Destination URL**: http\://roll.diceapi.com/json/d((args[0]))
2. **Output Template**: You rolled a ((res.dice[0].value))!

We copy the contents of **Command URL** and paste them into the URL in Mattermost where we are creating our Slash Command. Then in our chat, we can type `/roll 20` and get back the results of a 20-sided die roll. `/roll 6` would give us results for a 6-sided die roll.

## Variables

| Variable  | Values                                                                                      |
| --------- | ------------------------------------------------------------------------------------------- |
| `prx.*`   | `*` is either `url`, the **Destination URL** or `output`, the **Output Template**           |
| `args[#]` | `#` is a number (0-based) that represents a word's position after the Command Trigger Word. |
| `res.*`   | `*` is any attribute in the result from the Destination Server.                             |
| `mm.*`    | `*` is any of the additional params Mattermost tacked on to the MSC request:                |
|           | `channel_id`, `channel_name`, `command`, `response_url`, `team_domain`, `team_id`,          |
|           | `text`, `token`, `trigger_id`, `user_id`, `user_name`                                       |
