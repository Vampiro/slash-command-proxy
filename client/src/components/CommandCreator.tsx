import { Card, CardContent, CardHeader, TextField } from "@material-ui/core";
import React, { ChangeEvent, useEffect, useState } from "react";
import { createCommandUrl } from "../Utils";

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
  const [proxiedUrl, setProxiedUrl] = useState(props.proxiedUrl ?? "");
  const [outputTemplate, setOutputTemplate] = useState(
    props.outputTemplate ?? ""
  );

  // needed in the event that the props are ever changed.
  useEffect(() => {
    if (props.proxiedUrl) {
      setProxiedUrl(props.proxiedUrl);
    }

    if (props.outputTemplate) {
      setOutputTemplate(props.outputTemplate);
    }
  }, [props]);

  // handler for proxied url text field
  const handleProxiedUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProxiedUrl(event.target.value);
    if (props.onProxiedUrlChange) {
      props.onProxiedUrlChange(event.target.value);
    }
  };

  // handler for output template text field
  const handleOutputTemplateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOutputTemplate(event.target.value);
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
            value={proxiedUrl}
            variant="outlined"
          ></TextField>
          <TextField
            fullWidth
            label="Output Template"
            multiline
            onChange={handleOutputTemplateChange}
            size="small"
            value={outputTemplate}
            variant="outlined"
          ></TextField>
          <TextField
            disabled
            fullWidth
            label="Command URL"
            multiline
            size="small"
            value={createCommandUrl(proxiedUrl, outputTemplate)}
            variant="outlined"
          ></TextField>
        </CardContent>
      </Card>
    </div>
  );
}

export default CommandCreator;
