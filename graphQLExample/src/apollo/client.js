import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const httpLink = new HttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjo37p5l9450d01395wollpav',
});

const wsLink = new WebSocketLink({
  uri: 'wss://subscriptions.graph.cool/v1/cjo37p5l9450d01395wollpav',
  options: { reconnect: true }
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition'&& operation === 'subscription';;
  },
  wsLink,
  httpLink,
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

export default client;