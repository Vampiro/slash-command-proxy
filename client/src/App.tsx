import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import CommandCreatorPage from "./pages/CommandCreatorPage";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import "./App.scss";
import UserDocsPage from "./pages/UserDocsPage";

function App() {
  return (
    <Router>
      <div className="App">
        <AppBar position="static">
          <Toolbar classes={{ root: "nav-bar" }}>
            <Typography variant="h6" color="inherit">
              <Link to="/">Slash Command Proxy</Link>
            </Typography>
            <Link to="/help">
              <HelpOutlineIcon></HelpOutlineIcon>
            </Link>
          </Toolbar>
        </AppBar>
        <Route exact path="/">
          <CommandCreatorPage></CommandCreatorPage>
        </Route>
        <Route exact path="/help">
          <UserDocsPage></UserDocsPage>
        </Route>
      </div>
    </Router>
  );
}

export default App;
