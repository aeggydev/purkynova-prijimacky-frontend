import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { ChakraProvider } from "@chakra-ui/react"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { Provider } from "react-redux"
import { store } from "./store/store"

const client = new ApolloClient({
  uri: "https://localhost:7141/graphql",
  cache: new InMemoryCache(),
  connectToDevTools: true
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)
