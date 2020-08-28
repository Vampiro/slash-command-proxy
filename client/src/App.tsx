import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CommandCreatorPage from "./pages/CommandCreatorPage";
import UserDocsPage from "./pages/UserDocsPage";
import GitHubIcon from "@material-ui/icons/GitHub";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import "./App.scss";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#455f7b",
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <AppBar position="fixed">
            <Toolbar classes={{ root: "nav-bar" }}>
              <Typography variant="h6" color="inherit">
                <Link to="/">
                  <img
                    alt="Slash Command Proxy Logo"
                    className="logo"
                    src="/logo32.png"
                  ></img>{" "}
                  Slash Command Proxy
                </Link>
              </Typography>
              <div className="right-nav">
                <a
                  href="https://github.com/vampiro/slash-command-proxy"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <GitHubIcon></GitHubIcon>
                </a>
                <Link to="/help">
                  <HelpOutlineIcon></HelpOutlineIcon>
                </Link>
              </div>
            </Toolbar>
          </AppBar>
          <div className="main-content">
            <Route exact path="/">
              <CommandCreatorPage></CommandCreatorPage>
            </Route>
            <Route exact path="/help">
              <UserDocsPage></UserDocsPage>
            </Route>
          </div>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
