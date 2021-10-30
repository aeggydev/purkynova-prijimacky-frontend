import Contact from "./Contact";
import Header from "./Header";
import Menubar from "./Menubar";
import Welcome from "./Welcome";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
  #root {
    font-family: 'Roboto', sans-serif;
    background: white;
  }
`

function App() {
  return (
    <div className="h-full">
      <GlobalStyle />
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Menubar />
        <Switch>
          <Route path="/main">
            <Welcome />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
