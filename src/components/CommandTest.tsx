import React, { ChangeEvent, useEffect, useState, KeyboardEvent, useCallback } from "react";
import Axios from "axios";
import { CircularProgress, Fab, Grid, SvgIcon, TextField, Tooltip, Typography } from "@material-ui/core";
import { createCommandUrlForTest } from "../Utils";
import CallMadeIcon from "@material-ui/icons/CallMade";
import CancelIcon from "@material-ui/icons/Clear";
import marked from "marked";
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { mdiCodeTags, mdiFormatPilcrow } from "@mdi/js";
import { makeStyles } from "@material-ui/core/styles";
import "./CommandTest.scss";
import "highlight.js/styles/github.css";

hljs.registerLanguage("json", json);

const useStyles = makeStyles((theme) => ({
  buttonWrapper: {
    position: "relative",
  },
  fabProgress: {
    left: -3,
    pointerEvents: "none",
    position: "absolute",
    top: -3,
    zIndex: 1,
  },
}));

enum FormatType {
  Markdown = "MARKDOWN",
  Raw = "RAW",
}

function CommandTest(props: CommandTestProps) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [formatType, setFormatType] = useState(FormatType.Markdown);
  const [testResult, _setTestResult] = useState({ result: "", timestamp: 0 });

  // sets the rest result after looking to see if its timestamp is later than the
  // timestamp currently in testResult
  const setTestResult = (result: string, timestamp = Date.now()) => {
    _setTestResult((state) => {
      if (state.timestamp <= timestamp) {
        setLoading(false);
        return { timestamp, result };
      }

      return state;
    });
  };

  // "cancel" the current test. really just saying to ignore its result
  const cancelTest = useCallback(() => {
    setTestResult("");
    setLoading(false);
  }, []);

  // whenever any props are changed, blank out test result
  useEffect(() => {
    cancelTest();
  }, [props, cancelTest]);

  // handler for args text change
  const handleArgsChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (props.onArgsChange) {
      props.onArgsChange(event.target.value);
    }
  };

  // if user in args text field and hits enter, execute a new test
  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const element = event.target as HTMLInputElement;
      event.preventDefault();
      await executeTest();
      element.focus();
    }
  };

  // gather up the dest url, output template, and args and send request to proxy
  const executeTest = async () => {
    cancelTest();
    const timestamp = Date.now();
    setLoading(true);
    try {
      const response = await Axios.get(createCommandUrlForTest(props.destUrl, props.outputTemplate, props.args));
      setTestResult(response.data.text);
    } catch (error) {
      console.log(error);
      setTestResult(`An error occurred: ${error}`, timestamp);
    }
  };

  // style the test result based on user's choice
  const formatOutput = (testResult: string) => {
    if (formatType === FormatType.Markdown) {
      try {
        const textObj = JSON.parse(testResult);
        const objStr = JSON.stringify(textObj, null, 2);
        const formattingNote = marked(
          "*Note: JSON received is automatically formatted to look nice while in Markdown Formatting mode.*"
        );
        return `${formattingNote}<pre>${hljs.highlight("json", objStr).value}</pre>`;
      } catch (e) {
        return marked(testResult);
      }
    }

    return `<pre>${testResult}</pre>`;
  };

  return (
    <div className="CommandTest">
      <div className="header">
        <Typography className="title" variant="h6">
          Test Command
        </Typography>
        <ToggleButtonGroup
          size="small"
          value={formatType}
          exclusive
          onChange={(event, value) => {
            if (value !== null) {
              setFormatType(value);
            }
          }}
          aria-label="text alignment"
        >
          <ToggleButton aria-label="Markdown Format" value={FormatType.Markdown}>
            <Tooltip arrow placement="top" title="Markdown Formatting">
              <SvgIcon fontSize="small">
                <path d={mdiFormatPilcrow}></path>
              </SvgIcon>
            </Tooltip>
          </ToggleButton>
          <ToggleButton aria-label="Raw Format" value={FormatType.Raw}>
            <Tooltip arrow placement="top" title="Raw Formatting">
              <SvgIcon fontSize="small">
                <path d={mdiCodeTags}></path>
              </SvgIcon>
            </Tooltip>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <Grid alignItems="center" container>
        <Grid item className="args-wrapper">
          <TextField
            disabled={loading}
            fullWidth
            label="Command Args"
            onChange={handleArgsChange}
            onKeyDown={handleKeyDown}
            size="small"
            value={props.args}
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <div className={classes.buttonWrapper}>
            {!loading && (
              <Fab
                aria-label="Execute Test"
                color="primary"
                disabled={loading}
                onClick={() => {
                  executeTest();
                }}
                size="small"
              >
                <CallMadeIcon />
              </Fab>
            )}
            {loading && (
              <Fab
                aria-label="Cancel test"
                color="secondary"
                disabled={!loading}
                onClick={() => {
                  cancelTest();
                }}
                size="small"
              >
                <CancelIcon />
              </Fab>
            )}
            {loading && <CircularProgress size={45} className={classes.fabProgress} />}
          </div>
        </Grid>
      </Grid>
      {testResult.result && (
        <div
          className="test-result"
          dangerouslySetInnerHTML={{
            __html: formatOutput(testResult.result),
          }}
        ></div>
      )}
    </div>
  );
}

export default CommandTest;
