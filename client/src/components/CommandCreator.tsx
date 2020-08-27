import {
  Card,
  CardContent,
  CardHeader,
  Fab,
  SvgIcon,
  TextField,
  Tooltip,
} from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";
import { createCommandUrl } from "../Utils";
import { mdiContentCopy } from "@mdi/js";
import copyToClipboard from "copy-to-clipboard";
import "./CommandCreator.scss";

function CommandCreator(props: CommandCreatorProps) {
  const [copyTooltipOpen, setCopyTooltipOpen] = useState(false);

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

  const handleCopyClick = () => {
    copyToClipboard(createCommandUrl(props.proxiedUrl, props.outputTemplate));
    if (!copyTooltipOpen) {
      setCopyTooltipOpen(true);
      setTimeout(() => {
        setCopyTooltipOpen(false);
      }, 2000);
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
          <div className="command-url-and-copy">
            <TextField
              className="command-url"
              disabled
              fullWidth
              label="Command URL"
              multiline
              size="small"
              value={createCommandUrl(props.proxiedUrl, props.outputTemplate)}
              variant="outlined"
            ></TextField>
            <div className="copy-wrapper">
              <Tooltip
                open={copyTooltipOpen}
                title="Command URL copied to clipboard"
              >
                <Fab
                  aria-label="Test"
                  color="primary"
                  onClick={() => {
                    handleCopyClick();
                  }}
                  size="small"
                >
                  <SvgIcon>
                    <path d={mdiContentCopy}></path>
                  </SvgIcon>
                </Fab>
              </Tooltip>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

type CommandCreatorProps = {
  onOutputTemplateChange?: (outputTemplate: string) => void;
  onProxiedUrlChange?: (proxiedUrl: string) => void;
  outputTemplate: string;
  proxiedUrl: string;
};

export default CommandCreator;
