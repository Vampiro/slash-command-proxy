import { Container } from "@material-ui/core";
import React, { useState } from "react";
import CommandCreator from "../components/CommandCreator";
import CommandTest from "../components/CommandTest";
import "./CommandCreatorPage.scss";

function CommandCreatorPage() {
  const [outputTemplate, setOutputTemplate] = useState<string>("");
  const [proxiedUrl, setProxiedUrl] = useState<string>("");

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
          <div className="command-creator">
            <CommandCreator
              onOutputTemplateChange={handleOutputTemplateChange}
              onProxiedUrlChange={handleProxiedUrlChange}
              outputTemplate={outputTemplate}
              proxiedUrl={proxiedUrl}
            ></CommandCreator>
          </div>
          <div className="command-test">
            <CommandTest
              outputTemplate={outputTemplate}
              proxiedUrl={proxiedUrl}
            ></CommandTest>
          </div>
        </div>
        {/* <div className="right-col"></div> */}
      </div>
    </Container>
  );
}

export default CommandCreatorPage;
