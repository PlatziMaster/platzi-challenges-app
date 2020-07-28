export const SEARCH = /* GraphQL */ `
  query($query: String!) {
    search(query: $query, type: REPOSITORY, first: 50) {
      edges {
        node {
          ... on Repository {
            name
            url
            description
            homepageUrl
            createdAt
            primaryLanguage {
              id
              name
            }
            repositoryTopics(first: 10) {
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
  }
`;

export const REPO = /* GraphQL */ `
  query($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      name
      url
      description
      homepageUrl
      pullRequests(first: 100) {
        totalCount
        nodes {
          author {
            avatarUrl
            url
            login
          }
        }
      }
    }
  }
`;

export const PR_STATS = /* GraphQL */ `
  query($query: String!) {
    search(query: $query, type: REPOSITORY, first: 100) {
      edges {
        node {
          ... on Repository {
            name
            url
            pullRequests(first: 100) {
              totalCount
            }
          }
        }
      }
    }
  }
`;
