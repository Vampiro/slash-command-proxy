import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@material-ui/core";
import Axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { createCommandUrlForTest } from "../Utils";

import "./CommandTest.scss";

type CommandTestProps = {
  args?: string;
  onArgsChange?: (args: string) => void;
  outputTemplate: string;
  proxiedUrl: string;
};

function CommandTest(props: CommandTestProps) {
  const [args, setArgs] = useState<string>(props.args ?? "");
  const [testResult, setTestResult] = useState<string>("");

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
    try {
      const response = await Axios.get(
        createCommandUrlForTest(props.proxiedUrl, props.outputTemplate, args)
      );
      setTestResult(response.data.text);
    } catch (error) {
      setTestResult(`An error occurred: ${error}`);
    }
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
              <Button
                color="primary"
                onClick={() => {
                  handleGoClick();
                }}
                variant="contained"
              >
                Go
              </Button>
            </Grid>
          </Grid>
          <div>{props.proxiedUrl}</div>
          <div>{testResult}</div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CommandTest;
