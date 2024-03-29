import { Card, CardContent, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { CommandCreator } from "../components/CommandCreator";
import { CommandTest } from "../components/CommandTest";
import { ExampleList } from "../components/ExampleList";
import { examples } from "../examples";
import "./CommandCreatorPage.scss";

export function CommandCreatorPage() {
  const [args, setArgs] = useState<string>("");
  const [outputTemplate, setOutputTemplate] = useState<string>("");
  const [destUrl, setDestUrl] = useState<string>("");

  useEffect(() => {
    document.title = "Slash Command Proxy";
  }, []);

  const handleArgsChange = (args: string) => {
    setArgs(args);
  };

  const handleExampleSelect = (destUrl: string, outputTemplate: string, args: string) => {
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
      <Grid className="col" item xs={12} sm={8} md={7} lg={6}>
        <Card>
          <CardContent>
            <CommandCreator
              destUrl={destUrl}
              onDestUrlChange={handleDestUrlChange}
              onOutputTemplateChange={handleOutputTemplateChange}
              outputTemplate={outputTemplate}
            />
          </CardContent>
        </Card>
        <Card className="command-test-wrapper">
          <CardContent>
            <CommandTest
              args={args}
              destUrl={destUrl}
              onArgsChange={handleArgsChange}
              outputTemplate={outputTemplate}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid className="col" item xs={12} sm={4} md={4} lg={3}>
        <Card>
          <CardContent>
            <ExampleList examples={examples} onExampleSelect={handleExampleSelect} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
