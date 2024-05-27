import { useQuery, gql } from '@apollo/client';

import { ICategory } from '@/interfaces';

const GET_CATEGORIES_QUERY = gql`
  query getCategoriesOption {
    categories(first: 100, orderBy: [{ column: "created_at", order: ASC }]) {
      data {
        id
        name
      }
    }
  }
`;

interface IRecords {
  categories: {
    data: ICategory[];
  };
}

export const useGetCategoryOption = () => {
  const { data } = useQuery<IRecords>(GET_CATEGORIES_QUERY);

  return data ? data.categories.data : [];
};
