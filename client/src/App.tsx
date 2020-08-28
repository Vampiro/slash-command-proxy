import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CommandCreatorPage from "./pages/CommandCreatorPage";
import UserDocsPage from "./pages/UserDocsPage";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
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
              <Link to="/help">
                <HelpOutlineIcon></HelpOutlineIcon>
              </Link>
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
