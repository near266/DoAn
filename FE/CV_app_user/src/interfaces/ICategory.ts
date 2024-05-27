export interface ICategory {
  id?: string;
  name?: string;
  slug?: string;
  avatar?: string;
  description?: string;

  // relation
  posts_count?: number;
  followed?: any;
}
