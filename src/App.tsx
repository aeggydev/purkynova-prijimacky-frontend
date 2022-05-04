import { Redirect, Route, Switch, useHistory } from "react-router-dom"
import { createGlobalStyle } from "styled-components"
import React, { useEffect } from "react"
import { AdminRoutes, UserRoutes } from "./Routes"
import { Box } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "./store/store"
import { setLoggedIn } from "./store/login"
import Header from "./Components/Layout/Header"

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
        <Box h="100%">
            <GlobalStyle />
            <Box id="route-component" height="100%" display="flex" flexDir="column">
                <Header isAdmin={loginState.loggedIn} />
                <Switch>
                    <Route path="/" exact>
                        <Redirect to={"/main"} />
                    </Route>
                    {routes.filter(x => x.shouldGenerateRoute)
                        .map((x, i) => <Route path={x.path} key={i}>{x.component}</Route>)}
                </Switch>
            </Box>
        </Box>
    )
}

export default App
