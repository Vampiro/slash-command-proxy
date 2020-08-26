import { Card, CardContent, CardHeader, TextField } from "@material-ui/core";
import React, { ChangeEvent } from "react";
import { createCommandUrl } from "../Utils";

type CommandCreatorProps = {
  onOutputTemplateChange?: (outputTemplate: string) => void;
  onProxiedUrlChange?: (proxiedUrl: string) => void;
  outputTemplate: string;
  proxiedUrl: string;
};

function CommandCreator(props: CommandCreatorProps) {
  // handler for proxied url text field
  const handleProxiedUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (props.onProxiedUrlChange) {
      props.onProxiedUrlChange(event.target.value);
    }
  };

  // handler for output template text field
  const handleOutputTemplateChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (props.onOutputTemplateChange) {
      props.onOutputTemplateChange(event.target.value);
    }
  };

  return (
    <div className="CommandCreator">
      <Card>
        <CardHeader title="Command Creator" />
        <CardContent>
          <TextField
            fullWidth
            label="Proxied URL"
            multiline
            onChange={handleProxiedUrlChange}
            size="small"
            value={props.proxiedUrl}
            variant="outlined"
          ></TextField>
          <TextField
            fullWidth
            label="Output Template"
            multiline
            onChange={handleOutputTemplateChange}
            size="small"
            value={props.outputTemplate}
            variant="outlined"
          ></TextField>
          <TextField
            disabled
            fullWidth
            label="Command URL"
            multiline
            size="small"
            value={createCommandUrl(props.proxiedUrl, props.outputTemplate)}
            variant="outlined"
          ></TextField>
        </CardContent>
      </Card>
    </div>
  );
}

export default CommandCreator;