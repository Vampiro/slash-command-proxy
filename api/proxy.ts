import axios from "axios";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { ProxyResponse, RequestVariables, VariableCollection } from "../src/server/types";
import { Reserved } from "../src/types";
import { replaceVariables } from "../src/server/utils";

export default async (req: VercelRequest, response: VercelResponse) => {
  console.log(`${new Date()} Received /proxy request.`);

  const reqVars: RequestVariables = {
    args: req.query.text ? (req.query.text as string).split(" ") : [],
    client: {
      channel_name: req.query.channel_name as string,
      command: req.query.command as string,
      response_url: req.query.response_url as string,
      text: req.query.text as string,
      user_id: req.query.user_id as string,
      user_name: req.query.user_name as string,
    },
  };

  let resJson: ProxyResponse = { text: "" };
  const outputTemplate = req.query[`${Reserved.PROXY}.output`] as string;

  // helper function to create the response.
  const setResponse = (text: string, isError = false) => {
    resJson.text = text;

    // if response_type is undefined, the text is only shown to the executor. if "in_channel", it is shown to all.
    // so if we're returning an error, just show it to the user (leave response_type undefined).
    if (!isError) {
      resJson.response_type = "in_channel";
    }
  };

  if (req.query[`${Reserved.PROXY}.url`]) {
    // start out by replacing any variables within destination url (args)
    const destUrl = replaceVariables(req.query[`${Reserved.PROXY}.url`] as string, reqVars);

    try {
      // send off request to destination server
      const extResponse = await axios.get(destUrl);
      const variableCollection: VariableCollection = reqVars;
      variableCollection.res = extResponse.data;

      if (outputTemplate) {
        // try to replace any variables within output template (args, client, response)
        try {
          setResponse(replaceVariables(outputTemplate, variableCollection));
        } catch (error) {
          setResponse(`Encountered error while replacing variables: ${error}`, true);
        }
      } else {
        // no output template. check if string or object and set response appropriately
        if (typeof variableCollection.res === "string") {
          setResponse(variableCollection.res);
        } else {
          setResponse(JSON.stringify(variableCollection.res));
        }
      }
    } catch (error) {
      setResponse(`Encountered error from destination server: ${error}`, true);
    }
  } else {
    setResponse("Destination URL required", true);
  }

  response.status(200).json(resJson);
};
