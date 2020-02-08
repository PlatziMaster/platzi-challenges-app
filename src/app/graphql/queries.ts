export const SEARCH = /* GraphQL */`query($query: String!) {
  search(query: $query, type: REPOSITORY, first: 20) {
    repositoryCount
    edges {
      node {
        ... on Repository {
          name
          url
          description
          repositoryTopics(first: 10){
            nodes {
              id
              topic {
                id
                name
              }
            }
            totalCount
          }
        }
      }
    }
  }
}`;
