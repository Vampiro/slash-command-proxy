import { Container } from "@material-ui/core";
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
    <Container maxWidth="xl">
      <div className="CommandCreatorPage">
        <div className="left-col">
          <CommandCreator
            onOutputTemplateChange={handleOutputTemplateChange}
            onDestUrlChange={handleDestUrlChange}
            outputTemplate={outputTemplate}
            destUrl={destUrl}
          ></CommandCreator>
          <div className="command-test-wrapper">
            <CommandTest
              args={args}
              onArgsChange={handleArgsChange}
              outputTemplate={outputTemplate}
              destUrl={destUrl}
            ></CommandTest>
          </div>
        </div>
        <div className="right-col">
          <ExampleList onExampleSelect={handleExampleSelect}></ExampleList>
        </div>
      </div>
    </Container>
  );
}

export default CommandCreatorPage;
