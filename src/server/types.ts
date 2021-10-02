export interface ProxyResponse {
  text: string | Object;
  response_type?: "in_channel";
}

export interface VariableCollection {
  args: string[];
  client: {
    channel_id: string;
    channel_name: string;
    command: string;
    response_url: string;
    team_domain: string;
    team_id: string;
    text: string;
    token: string;
    trigger_id: string;
    user_id: string;
    user_name: string;
  };
  res: string | Object;
}
