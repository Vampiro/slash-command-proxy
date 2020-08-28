import { Card, CardContent, CardHeader, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CommandCreator from "../components/CommandCreator";
import CommandTest from "../components/CommandTest";
import ExampleList from "../components/ExampleList";
import "./CommandCreatorPage.scss";

function CommandCreatorPage() {
  const [args, setArgs] = useState<string>("");
  const [outputTemplate, setOutputTemplate] = useState<string>("");
  const [destUrl, setDestUrl] = useState<string>("");

  useEffect(() => {
    document.title = "Slash Command Proxy";
  }, []);

  const handleArgsChange = (args: string) => {
    setArgs(args);
  };

  const handleExampleSelect = (
    destUrl: string,
    outputTemplate: string,
    args: string
  ) => {
    setArgs(args);
    setOutputTemplate(outputTemplate);
    setDestUrl(destUrl);
  };

  const handleOutputTemplateChange = (outputTemplate: string) => {
    setOutputTemplate(outputTemplate);
  };

  const handleDestUrlChange = (destUrl: string) => {
    setDestUrl(destUrl);
  };

  return (
    <Grid className="CommandCreatorPage" container justify="center">
      <Grid className="col" item xs={12} sm={9} md={7} lg={6}>
        <Card>
          <CardHeader title="Command Creator" />
          <CardContent>
            <CommandCreator
              onOutputTemplateChange={handleOutputTemplateChange}
              onDestUrlChange={handleDestUrlChange}
              outputTemplate={outputTemplate}
              destUrl={destUrl}
            ></CommandCreator>
          </CardContent>
        </Card>
        <div className="command-test-wrapper">
          <Card>
            <CardHeader title="Test Command" />
            <CardContent>
              <CommandTest
                args={args}
                onArgsChange={handleArgsChange}
                outputTemplate={outputTemplate}
                destUrl={destUrl}
              ></CommandTest>
            </CardContent>
          </Card>
        </div>
      </Grid>
      <Grid className="col" item xs={12} sm={3} md={4} lg={3}>
        <Card>
          <CardHeader title="Example Commands" />
          <CardContent>
            <ExampleList onExampleSelect={handleExampleSelect}></ExampleList>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default CommandCreatorPage;
