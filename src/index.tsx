import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { ChakraProvider } from "@chakra-ui/react"
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client"
import { Provider } from "react-redux"
import { store } from "./store/store"
import { setContext } from "@apollo/client/link/context"
import { BrowserRouter } from "react-router-dom"

const cache: InMemoryCache = new InMemoryCache({
    typePolicies: {}
})

const httpLink = createHttpLink({
    uri: "https://localhost:7141/graphql"
})
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token")
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ""
        }
    }
})
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    connectToDevTools: true
})

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ApolloProvider client={client}>
                <ChakraProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </ChakraProvider>
            </ApolloProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
)
