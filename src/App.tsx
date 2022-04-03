import Header from "./Components/Header"
import { CssBaseline } from "@mui/material"
import { Redirect, Route, Switch, useHistory } from "react-router-dom"
import { Dashboard } from "./Components/Views/Dashboard"
import { createGlobalStyle } from "styled-components"
import React, { useEffect } from "react"
import { AdminRoutes, UserRoutes } from "./Routes"
import { Box } from "@chakra-ui/react"
import Reporter from "./Components/Error/Reporter"
import { Login } from "./Components/Login"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "./store/store"
import { setLoggedIn } from "./store/login"

const GlobalStyle = createGlobalStyle`
    #root {
        font-family: 'Roboto', sans-serif;
        background: white;
        width: 100vw; // Prevent resizing the app when the scrollbar appears
        overflow-x: hidden;
        overflow-y: scroll; // Always show vertical scrollbar, to avoid needlessly resizing horizontally
    }
`

function App() {
    const loginState = useSelector((state: RootState) => state.login)
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            dispatch(setLoggedIn(true))
            history.push("/dashboard")
        }
    }, [])

    const routes = loginState.loggedIn
        ? AdminRoutes
        : UserRoutes

    return (
        <Reporter>
            <Box h="100%">
                <GlobalStyle />
                <CssBaseline />
                <Box id="route-component" height="100%" display="flex" flexDir="column">
                    {loginState.showLogin && <Login />}
                    <Header isAdmin={loginState.loggedIn} />
                    <Switch>
                        <Route path="/" exact>
                            <Redirect to={"/main"} />
                        </Route>
                        {routes.filter(x => x.shouldGenerateRoute)
                            .map((x, i) => <Route path={x.path} key={i} render={x.component} />)}
                        <Route path={"/dashboard"}>
                            <Dashboard />
                        </Route>
                    </Switch>
                </Box>
            </Box>
        </Reporter>
    )
}

export default App
