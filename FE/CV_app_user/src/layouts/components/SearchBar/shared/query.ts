import { gql } from '@apollo/client';

export const SEARCH_POSTS_QUERY = gql`
  query searchPosts {
    posts(orderBy: [{ column: "created_at", order: DESC }]) {
      data {
        id
        name
        slug
        view_number
        avatar
        creator {
          id
          name
          username
        }
      }
    }
  }
`;
