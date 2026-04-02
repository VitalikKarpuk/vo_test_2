import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'

export const STRAPI_URL = 'https://cms.silvana.one'

const backend = new HttpLink({
  uri: 'https://suiscan.xyz/api/sui-backend/mainnet/graphql',
})

const silvana = new HttpLink({
  uri: STRAPI_URL + '/graphql',
})

// Client that can switch between Strapi (default) and backend based on context
export const client = new ApolloClient({
  link: ApolloLink.split(
    (operation) => operation.getContext().clientName === 'backend',
    backend,
    silvana
  ),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
})

// For server-side usage, create a new client each request
function createApolloClient() {
  return new ApolloClient({
    link: ApolloLink.split(
      (operation) => operation.getContext().clientName === 'backend',
      new HttpLink({ uri: 'https://suiscan.xyz/api/sui-backend/mainnet/graphql' }),
      new HttpLink({ uri: STRAPI_URL + '/graphql' })
    ),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
  })
}

// Singleton for client-side usage
let apolloClientInstance: ApolloClient<unknown> | null = null

export function getApolloClient() {
  if (typeof window === 'undefined') {
    // Server-side: create new client for each request
    return createApolloClient()
  }

  // Client-side: reuse the singleton
  if (!apolloClientInstance) {
    apolloClientInstance = client
  }

  return apolloClientInstance
}

export { createApolloClient }
