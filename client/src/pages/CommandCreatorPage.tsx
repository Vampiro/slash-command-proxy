import { Container } from "@material-ui/core";
import React, { useState } from "react";
import CommandCreator from "../components/CommandCreator";
import CommandTest from "../components/CommandTest";
import ExampleList from "../components/ExampleList";
import "./CommandCreatorPage.scss";

function CommandCreatorPage() {
  const [args, setArgs] = useState<string>("");
  const [outputTemplate, setOutputTemplate] = useState<string>("");
  const [proxiedUrl, setProxiedUrl] = useState<string>("");

  const handleArgsChange = (args: string) => {
    setArgs(args);
  };

  const handleExampleSelect = (
    proxiedUrl: string,
    outputTemplate: string,
    args: string
  ) => {
    setArgs(args);
    setOutputTemplate(outputTemplate);
    setProxiedUrl(proxiedUrl);
  };

  const handleOutputTemplateChange = (outputTemplate: string) => {
    setOutputTemplate(outputTemplate);
  };

  const handleProxiedUrlChange = (proxiedUrl: string) => {
    setProxiedUrl(proxiedUrl);
  };

  return (
    <Container maxWidth="xl">
      <div className="CommandCreatorPage">
        <div className="left-col">
          <CommandCreator
            onOutputTemplateChange={handleOutputTemplateChange}
            onProxiedUrlChange={handleProxiedUrlChange}
            outputTemplate={outputTemplate}
            proxiedUrl={proxiedUrl}
          ></CommandCreator>
          <div className="command-test-wrapper">
            <CommandTest
              args={args}
              onArgsChange={handleArgsChange}
              outputTemplate={outputTemplate}
              proxiedUrl={proxiedUrl}
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