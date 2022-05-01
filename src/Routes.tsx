import { Dashboard } from "./Components/AdminViews/Dashboard/Dashboard"
import { Settings } from "./Components/AdminViews/Settings"
import Welcome from "./Components/UserViews/Welcome"
import SignUpForm from "./Components/UserViews/SignUpForm"
import Contact from "./Components/UserViews/Contact"

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
        text: "Přihláška",
        listed: true,
        shouldGenerateRoute: true,
        component: <SignUpForm />
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
