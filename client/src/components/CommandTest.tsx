import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@material-ui/core";
import Axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { createCommandUrlForTest } from "../Utils";
import "./CommandTest.scss";

type CommandTestProps = {
  outputTemplate: string;
  proxiedUrl: string;
  args?: string;
};

function CommandTest(props: CommandTestProps) {
  const [args, setArgs] = useState<string>(props.args ?? "");
  const [testResult, setTestResult] = useState<string>("");

  const handleArgsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setArgs(event.target.value);
  };

  const commandUrl = createCommandUrlForTest(
    props.proxiedUrl,
    props.outputTemplate,
    args
  );

  const handleGoClick = async () => {
    try {
      const response = await Axios.get(commandUrl);
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
          <div>{testResult}</div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CommandTest;
