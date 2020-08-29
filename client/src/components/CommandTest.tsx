import React, {
  ChangeEvent,
  useEffect,
  useState,
  KeyboardEvent,
  useCallback,
} from "react";
import Axios from "axios";
import { CircularProgress, Fab, Grid, TextField } from "@material-ui/core";
import { createCommandUrlForTest } from "../Utils";
import CallMadeIcon from "@material-ui/icons/CallMade";
import CancelIcon from "@material-ui/icons/Clear";
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
      const response = await Axios.get(
        createCommandUrlForTest(props.destUrl, props.outputTemplate, props.args)
      );
      const { text } = response.data;
      try {
        const textObj = JSON.parse(text);
        const objStr = JSON.stringify(textObj, null, 2);
        setTestResult(
          `<pre>${hljs.highlight("json", objStr).value}</pre>`,
          timestamp
        );
      } catch (e) {
        setTestResult(
          marked(text.replace(/(\r\n|\n|\r)/g, "<br />")),
          timestamp
        );
      }
    } catch (error) {
      setTestResult(`An error occurred: ${error}`, timestamp);
    }
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
                <CallMadeIcon></CallMadeIcon>
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
                <CancelIcon></CancelIcon>
              </Fab>
            )}
            {loading && (
              <CircularProgress size={45} className={classes.fabProgress} />
            )}
          </div>
        </Grid>
      </Grid>
      <div
        dangerouslySetInnerHTML={{
          __html: testResult.result,
        }}
      ></div>
    </div>
  );
}

export default CommandTest;
