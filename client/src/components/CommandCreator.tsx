import { Card, CardContent, CardHeader, TextField } from "@material-ui/core";
import React, { ChangeEvent, useEffect, useState } from "react";
import { createCommandUrl } from "../Utils";
import "./CommandCreator.scss";

type CommandCreatorProps = {
  onOutputTemplateChange?: (outputTemplate: string) => void;
  onProxiedUrlChange?: (proxiedUrl: string) => void;
  outputTemplate?: string;
  proxiedUrl?: string;
};

// testing
// proxied url: http://roll.diceapi.com/json/d((args[0]))
// output template: You rolled a ((res.dice[0].value))
// command args: 20

function CommandCreator(props: CommandCreatorProps) {
  const [outputTemplate, setOutputTemplate] = useState<string>(
    props.outputTemplate ?? ""
  );
  const [proxiedUrl, setProxiedUrl] = useState<string>(props.proxiedUrl ?? "");

  const { onOutputTemplateChange, onProxiedUrlChange } = props;
  useEffect(() => {
    if (onOutputTemplateChange) {
      onOutputTemplateChange(outputTemplate);
    }
  }, [outputTemplate, onOutputTemplateChange]);

  useEffect(() => {
    if (onProxiedUrlChange) {
      onProxiedUrlChange(proxiedUrl);
    }
  }, [proxiedUrl, onProxiedUrlChange]);

  // handler for proxied url text field
  const handleProxiedUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProxiedUrl(event.target.value);
  };

  // handler for output template text field
  const handleOutputTemplateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOutputTemplate(event.target.value);
  };

  // create the command url
  const commandUrl = createCommandUrl(proxiedUrl, outputTemplate);

  return (
    <div className="CommandCreator">
      <Card>
        <CardHeader title="Command Creator" />
        <CardContent>
          <TextField
            defaultValue={proxiedUrl}
            fullWidth
            label="Proxied URL"
            multiline
            onChange={handleProxiedUrlChange}
            size="small"
            variant="outlined"
          ></TextField>
          <TextField
            defaultValue={outputTemplate}
            fullWidth
            label="Output Template"
            multiline
            onChange={handleOutputTemplateChange}
            size="small"
            variant="outlined"
          ></TextField>
          <TextField
            disabled
            fullWidth
            label="Command URL"
            multiline
            size="small"
            value={commandUrl}
            variant="outlined"
          ></TextField>
        </CardContent>
      </Card>
    </div>
  );
}

export default CommandCreator;
