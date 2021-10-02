import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CommandCreatorPage } from "./pages/CommandCreatorPage";
import { UserDocsPage } from "./pages/UserDocsPage";
import GitHubIcon from "@material-ui/icons/GitHub";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import "./App.scss";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#455f7b",
    },
    secondary: {
      main: "#7b455f",
    },
  },
});

export function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <AppBar position="fixed">
            <Toolbar classes={{ root: "nav-bar" }}>
              <Typography variant="h6" color="inherit">
                <Link to="/">
                  <img alt="Slash Command Proxy Logo" className="logo" src="/logo32.png" /> Slash Command Proxy
                </Link>
              </Typography>
              <div className="right-nav">
                <a href="https://github.com/vampiro/slash-command-proxy" rel="noopener noreferrer" target="_blank">
                  <GitHubIcon />
                </a>
                <Link to="/help">
                  <HelpOutlineIcon />
                </Link>
              </div>
            </Toolbar>
          </AppBar>
          <div className="main-content">
            <Route exact path="/">
              <CommandCreatorPage />
            </Route>
            <Route exact path="/help">
              <UserDocsPage />
            </Route>
          </div>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}
