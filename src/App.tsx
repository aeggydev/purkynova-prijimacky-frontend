import Header from "./Components/Header";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Dashboard } from "./Components/Views/Dashboard";
import { createGlobalStyle } from "styled-components";
import React from "react";
import Routes from "./Routes";
import { Box } from "@chakra-ui/react";

const GlobalStyle = createGlobalStyle`
  #root {
    font-family: 'Roboto', sans-serif;
    background: white;
    width: 100vw; // Prevent resizing the app when the scrollbar appears
    overflow-x: hidden;
  }
`

function App() {
  return (
    <Box h="100%">
      <GlobalStyle />
      <CssBaseline />
      <Box id="route-component" height="100%">
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" exact>
              <Redirect to={"/main"} />
            </Route>
            {Routes.filter(x => x.shouldGenerateRoute)
              .map((x, i) => <Route path={x.path} key={i} render={x.component} />)}
            <Route path={"/dashboard"}>
              <Dashboard />
            </Route>
          </Switch>
        </BrowserRouter>
      </Box>
    </Box>
  );
}

export default App;
