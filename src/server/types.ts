/** Response that will be sent back to the chat client. */
export interface ProxyResponse {
  /**
   * If `undefined`, the text is only shown to the user who called the slash command.
   * If `in_channel`, it is shown to all.
   * For any errors, this will be `undefined`.
   */
  response_type?: "in_channel";
  /** The text to be displayed in the chat client. */
  text: string | Object;
}

/** All variables sent over in the slash command proxy request. */
export interface RequestVariables {
  /** Any args provided to the slash command. */
  args: string[];
  /** Variables set by the chat client. This list is non-exhaustive. */
  client: {
    /** Name of the channel as the user sees it. */
    channel_name: string;
    /** The slash command e.g. "/roll". */
    command: string;
    /** URL that can be used to send delayed responses to. */
    response_url: string;
    /** This is the part of the Slash Command after the command itself. Split apart to create args. */
    text: string;
    /** The ID of the user who triggered the command. */
    user_id: string;
    /** The plain text name of the user who triggered the command. */
    user_name: string;
  };
}

/** All the proxy request variables along with the response from the downstream proxied resource. */
export interface VariableCollection extends RequestVariables {
  /** Response from the proxied resource. */
  res?: any;
}
