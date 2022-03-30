import Welcome from "./Components/Views/Welcome"
import { Dashboard } from "./Components/Views/Dashboard"
import Form from "./Components/Views/Form"
import Contact from "./Components/Views/Contact"

export type Route = {
  path: string
  text: string
  listed: boolean
  shouldGenerateRoute: boolean
  component: () => JSX.Element
}

const Routes: Route[] = [
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

const AdminRoutes: Route[] = [
    {
        // TODO: Fix react router Route generation
        path: "/dashboard",
        text: "Dashboard",
        listed: true,
        shouldGenerateRoute: false,
        component: Dashboard
    }
]

export default Routes
