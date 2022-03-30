import Header from "./Components/Header"
import { CssBaseline } from "@mui/material"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import { Dashboard } from "./Components/Views/Dashboard"
import { createGlobalStyle } from "styled-components"
import React, { useState } from "react"
import Routes from "./Routes"
import { Box } from "@chakra-ui/react"
import Reporter from "./Components/Error/Reporter"

const GlobalStyle = createGlobalStyle`
    #root {
        font-family: 'Roboto', sans-serif;
        background: white;
        width: 100vw; // Prevent resizing the app when the scrollbar appears
        overflow-x: hidden;
        overflow-y: scroll; // Always show vertical scrollbar, to avoid needlessly resizing horizontally
    }
`

interface AppContextType {
    login: () => void
}

export const AppContext = React.createContext<AppContextType>({} as AppContextType)

function App() {
    const [isAdmin, setIsAdmin] = useState(false)

    function login() {
        // TODO: Make this actually authenticate
        setIsAdmin(!isAdmin)
    }

    return (
        <AppContext.Provider value={{ login }}>
            <Reporter>
                <Box h="100%">
                    <GlobalStyle />
                    <CssBaseline />
                    <Box id="route-component" height="100%" display="flex" flexDir="column">
                        <BrowserRouter>
                            <Header isAdmin={isAdmin} />
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
                    </Box>
                </Box>
            </Reporter>
        </AppContext.Provider>
    )
}

export default App
