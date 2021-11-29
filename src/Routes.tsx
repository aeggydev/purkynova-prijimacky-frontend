import Welcome from "./Components/Welcome";
import { Dashboard } from "./Components/Dashboard";
import Form from "./Components/Form";
import Contact from "./Components/Contact";

export default [
  {
    path: "/main",
    text: "Hlavní stránka",
    listed: true,
    shouldGenerateRoute: true,
    component: Welcome
  },
  {
    // TODO: Fix react router Route generation
    path: "/dashboard",
    text: "Dashboard",
    listed: true,
    shouldGenerateRoute: false,
    component: Dashboard
  },
  {
    path: "/form",
    text: "Elektronická přihláška",
    listed: true,
    shouldGenerateRoute: true,
    component: Form
  },
  {
    path: "/contact",
    text: "Kontakt",
    listed: true,
    shouldGenerateRoute: true,
    component: Contact
  }
]