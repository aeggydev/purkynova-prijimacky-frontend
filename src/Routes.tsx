import Welcome from "./Components/UserViews/Welcome"
import { Dashboard } from "./Components/AdminViews/Dashboard/Dashboard"
import Form from "./Components/UserViews/Form"
import Contact from "./Components/UserViews/Contact"
import { Settings } from "./Components/AdminViews/Settings"

export type Route = {
    path: string
    text: string
    listed: boolean
    shouldGenerateRoute: boolean
    component: JSX.Element
}

export const UserRoutes: Route[] = [
    {
        path: "/main",
        text: "Hlavní stránka",
        listed: true,
        shouldGenerateRoute: true,
        component: <Welcome />
    },
    {
        path: "/form",
        text: "Elektronická přihláška",
        listed: true,
        shouldGenerateRoute: true,
        component: <Form />
    },
    {
        path: "/contact",
        text: "Kontakt",
        listed: true,
        shouldGenerateRoute: true,
        component: <Contact />
    }
]

export const AdminRoutes: Route[] = [
    {
        path: "/dashboard",
        text: "Správa účastníků",
        listed: true,
        shouldGenerateRoute: true,
        component: <Dashboard />
    },
    {
        path: "/settings",
        text: "Nastavení",
        listed: true,
        shouldGenerateRoute: true,
        component: <Settings />
    }
]
