import { gql } from '@apollo/client';

// TODO: Them logic xu ly chi nguoi dung tao ra bai viet moi duoc xem thong tin bai viet nhap
export const DETAIL_POST_QUERY = gql`
  query detailPost($slug: String) {
    post(slug: $slug) {
      id
      name
      content
      avatar
      tags
      category_id
    }
  }
`;
