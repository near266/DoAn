import { gql } from '@apollo/client';

// TODOKOGAP: xu ly trang thai tren server
export const GET_ASSESSMENTS_QUERY = gql`
  query getAssessments {
    assessments(orderBy: [{ column: "created_at", order: DESC }], status: 1) {
      data {
        id
        name
        description
        avatar
        slug
        status
      }
    }
  }
`;

export const SHOW_ASSESSMENTS_QUERY = gql`
  query findAssessment($slug: String) {
    assessment(slug: $slug) {
      id
      name
      test_tutorial
      slug
      questions {
        id
        content
        answers
      }
    }
  }
`;

export const DETAIL_ASSESSMENTS_QUERY = gql`
  query detailAssessment($slug: String) {
    assessment(slug: $slug) {
      id
      name
      content
      description
      avatar
      slug
      sale_code
    }
  }
`;

export const GET_SIL_EVENT_QUERY = gql`
  query getSilEvent {
    sils(orderBy: [{ column: "created_at", order: DESC }], status: 1) {
      data {
        id
        name
        description
        avatar
        slug
        status
      }
    }
  }
`;

export const DETAIL_SIL_QUERY = gql`
  query detailSil($slug: String) {
    sil(slug: $slug) {
      id
      name
      content
      description
      avatar
      slug
      test_time
    }
  }
`;

export const GET_SIL_QUESTIONS_QUERY = gql`
  query getSilQuestions($slug: String) {
    sil(slug: $slug) {
      id
      name
      test_tutorial
      slug
      questions {
        id
        content
        answers {
          id
          question_id
          content
        }
      }
    }
  }
`;
