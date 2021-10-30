import Contact from "./Contact";
import Header from "./Header";
import Menubar from "./Menubar";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Dashboard } from "./Dashboard";

function App() {
  return (
    <div className="App">
      <CssBaseline></CssBaseline>
      <BrowserRouter>
        <Header></Header>
        <Menubar></Menubar>
        <Switch>
          <Route path="/dashboard">
            <Dashboard></Dashboard>
          </Route>
          <Route path="/contact">
            <Contact></Contact>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
