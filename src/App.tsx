import Header from "./Components/Header";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Dashboard } from "./Components/Dashboard";
import { createGlobalStyle } from "styled-components";
import React from "react"
import Routes from "./Routes"

const GlobalStyle = createGlobalStyle`
  #root {
    font-family: 'Roboto', sans-serif;
    background: white;
    width: 100vw; // Prevent resizing the app when the scrollbar appears
  }
`

function App() {
  console.log(Routes)

  return (
    <div style={{height: "100%"}}>
      <GlobalStyle />
      <CssBaseline />
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
    </div>
  );
}

export default App;
