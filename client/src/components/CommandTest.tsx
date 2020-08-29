import { CircularProgress, Fab, Grid, TextField } from "@material-ui/core";
import Axios from "axios";
import React, { ChangeEvent, useEffect, useState, KeyboardEvent } from "react";
import { createCommandUrlForTest } from "../Utils";
import CallMadeIcon from "@material-ui/icons/CallMade";
import { makeStyles } from "@material-ui/core/styles";
import marked from "marked";
import "./CommandTest.scss";

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
      setTestResult(response.data.text);
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
          __html: marked(testResult.replace(/(\r\n|\n|\r)/g, "<br />")),
        }}
      ></div>
    </div>
  );
}

export default CommandTest;
