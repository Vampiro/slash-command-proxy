import React from "react";
import "./App.scss";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import CommandCreatorPage from "./pages/CommandCreatorPage";

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar classes={{ root: "nav-bar" }}>
          <Typography variant="h6" color="inherit">
            Mattermost Slash Command Proxy
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="main-content">
        <div className="command-creator-page">
          <CommandCreatorPage></CommandCreatorPage>
        </div>
      </div>
    </div>
  );
}

export default App;
