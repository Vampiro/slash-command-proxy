import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Fab,
  Grid,
  TextField,
} from "@material-ui/core";
import Axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { createCommandUrlForTest } from "../Utils";
import CallMadeIcon from "@material-ui/icons/CallMade";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import "./CommandTest.scss";

type CommandTestProps = {
  args?: string;
  onArgsChange?: (args: string) => void;
  outputTemplate: string;
  proxiedUrl: string;
};

const useStyles = makeStyles((theme) => ({
  buttonWrapper: {
    position: "relative",
  },
  button: {
    backgroundColor: blue[700],
    "&:hover": {
      backgroundColor: blue[900],
    },
  },
  fabProgress: {
    color: blue[700],
    left: -3,
    pointerEvents: "none",
    position: "absolute",
    top: -3,
    zIndex: 1,
  },
}));

function CommandTest(props: CommandTestProps) {
  const classes = useStyles();
  const [args, setArgs] = useState<string>(props.args ?? "");
  const [testResult, setTestResult] = useState<string>("");
  const [loading, setLoading] = React.useState(false);

  // needed in the event that the props are ever changed.
  useEffect(() => {
    if (props.args) {
      setArgs(props.args);
    }
  }, [props]);

  const handleArgsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setArgs(event.target.value);
    if (props.onArgsChange) {
      props.onArgsChange(event.target.value);
    }
  };

  const handleGoClick = async () => {
    setLoading(true);
    try {
      const response = await Axios.get(
        createCommandUrlForTest(props.proxiedUrl, props.outputTemplate, args)
      );
      setTestResult(response.data.text);
    } catch (error) {
      setTestResult(`An error occurred: ${error}`);
    }
    setLoading(false);
  };

  return (
    <div className="CommandTest">
      <Card>
        <CardHeader title="Test Command" />
        <CardContent>
          <Grid alignItems="center" container>
            <Grid item className="args-wrapper">
              <TextField
                fullWidth
                label="Command Args"
                multiline
                onChange={handleArgsChange}
                size="small"
                value={args}
                variant="outlined"
              ></TextField>
            </Grid>
            <Grid item>
              <div className={classes.buttonWrapper}>
                <Fab
                  aria-label="go"
                  color="primary"
                  className={classes.button}
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
          <div>{testResult}</div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CommandTest;
