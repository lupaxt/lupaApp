import React from "react";
// import registerServiceWorker from "./registerServiceWorker";
import {ApolloProvider} from "react-apollo";
import {ApolloClient} from "apollo-client";
import {createHttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";
import {setContext} from "apollo-link-context";
import {split} from "apollo-link";
import {WebSocketLink} from "apollo-link-ws";
import {getMainDefinition} from "apollo-utilities";
import {graphql_server} from '../endpoints'


const getToken = () => "ABC";
let token = "ABCD"

const Apollo = ({ idToken = "ABC", children }) => {
  const httpLink = createHttpLink({ uri: graphql_server });

  const authLink = setContext((_, { headers }) => {
    token = idToken;
    return { headers: { ...headers, authorization: idToken } }; //token ? `Bearer ${token}` : ""
  });

  const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000`,
    options: {
      reconnect: true,
      connectionParams: {
        authToken: idToken
      }
    }
  });

  const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === "OperationDefinition" && operation === "subscription";
    },
    wsLink,
    authLink.concat(httpLink)
  );
  console.log("rerender apollo", `{"Authorization" : "Bearer ${idToken}"}`);
  const client = new ApolloClient({ link, cache: new InMemoryCache()});

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};


export default Apollo;
