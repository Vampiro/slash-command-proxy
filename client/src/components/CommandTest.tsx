import React, { ChangeEvent, useEffect, useState, KeyboardEvent } from "react";
import Axios from "axios";
import { CircularProgress, Fab, Grid, TextField } from "@material-ui/core";
import { createCommandUrlForTest } from "../Utils";
import CallMadeIcon from "@material-ui/icons/CallMade";
import marked from "marked";
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
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

function CommandTest(props: CommandTestProps) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [testResult, setTestResult] = useState<string>("");

  // whenever any props are changed, blank out test result
  useEffect(() => {
    setTestResult("");
  }, [props]);

  const handleArgsChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (props.onArgsChange) {
      props.onArgsChange(event.target.value);
    }
  };

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const element = event.target as HTMLInputElement;
      event.preventDefault();
      await handleGoClick();
      element.focus();
    }
  };

  const handleGoClick = async () => {
    setLoading(true);
    try {
      const response = await Axios.get(
        createCommandUrlForTest(props.destUrl, props.outputTemplate, props.args)
      );
      const { text } = response.data;
      try {
        const textObj = JSON.parse(text);
        const objStr = JSON.stringify(textObj, null, 2);
        setTestResult(`<pre>${hljs.highlight("json", objStr).value}</pre>`);
      } catch (e) {
        setTestResult(marked(text.replace(/(\r\n|\n|\r)/g, "<br />")));
      }
    } catch (error) {
      setTestResult(`An error occurred: ${error}`);
    }

    setLoading(false);
  };

  return (
    <div className="CommandTest">
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
          ></TextField>
        </Grid>
        <Grid item>
          <div className={classes.buttonWrapper}>
            <Fab
              aria-label="go"
              color="primary"
              disabled={loading}
              onClick={() => {
                handleGoClick();
              }}
              size="small"
            >
              <CallMadeIcon></CallMadeIcon>
            </Fab>
            {loading && (
              <CircularProgress size={45} className={classes.fabProgress} />
            )}
          </div>
        </Grid>
      </Grid>
      <div
        dangerouslySetInnerHTML={{
          __html: testResult,
        }}
      ></div>
    </div>
  );
}

export default CommandTest;
