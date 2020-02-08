export const SEARCH = /* GraphQL */`query($query: String!) {
  search(query: $query, type: REPOSITORY, first: 50) {
    edges {
      node {
        ... on Repository {
          name
          url
          description
          homepageUrl
          primaryLanguage {
            id
            name
          }
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
