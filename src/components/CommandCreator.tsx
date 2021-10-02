import { Fab, SvgIcon, TextField, Tooltip, Typography } from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";
import { createCommandUrl } from "../Utils";
import { mdiContentCopy } from "@mdi/js";
import copyToClipboard from "copy-to-clipboard";
import "./CommandCreator.scss";

function CommandCreator(props: CommandCreatorProps) {
  const [copyTooltipOpen, setCopyTooltipOpen] = useState(false);

  // handler for destination url text field
  const handleDestUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (props.onDestUrlChange) {
      props.onDestUrlChange(event.target.value);
    }
  };

  // handler for output template text field
  const handleOutputTemplateChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (props.onOutputTemplateChange) {
      props.onOutputTemplateChange(event.target.value);
    }
  };

  // when copy button is clicked
  const handleCopyClick = () => {
    // copy Command Url to the user's clipboard
    copyToClipboard(createCommandUrl(props.destUrl, props.outputTemplate));
    if (!copyTooltipOpen) {
      // show tooltip for x seconds
      setCopyTooltipOpen(true);
      setTimeout(() => {
        setCopyTooltipOpen(false);
      }, 2000);
    }
  };

  return (
    <div className="CommandCreator">
      <Typography className="title" variant="h6">
        Command Creator
      </Typography>
      <TextField
        fullWidth
        label="Destination URL"
        multiline
        onChange={handleDestUrlChange}
        size="small"
        value={props.destUrl}
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
          rowsMax={5}
          size="small"
          value={createCommandUrl(props.destUrl, props.outputTemplate)}
          variant="outlined"
        ></TextField>
        <div className="copy-wrapper">
          <Tooltip open={copyTooltipOpen} title="Command URL copied to clipboard">
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
    </div>
  );
}

export default CommandCreator;
