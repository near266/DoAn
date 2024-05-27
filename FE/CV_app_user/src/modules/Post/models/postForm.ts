import { IPost } from '@/interfaces';

export class PostForm {
  constructor(item: IPost = null) {
    if (item) {
      this.name = item.name;
      this.category_id = item.category_id;
      this.content = item.content;
      this.tags = item.tags ? item.tags.split(',') : [];
      this.avatar = item.avatar;
    }
  }

  name: string = '';
  category_id: string = null;
  content: string = '';
  tags: string[] = [];
  avatar: string = null;
}
