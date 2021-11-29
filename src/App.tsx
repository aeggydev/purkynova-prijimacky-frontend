import Header from "./Components/Header";
import Menubar from "./Components/Menubar";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Dashboard } from "./Components/Dashboard";
import { createGlobalStyle } from "styled-components";
import React from "react"
import Routes from "./Routes"

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
  #root {
    font-family: 'Roboto', sans-serif;
    background: white;
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
        <Menubar />
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
