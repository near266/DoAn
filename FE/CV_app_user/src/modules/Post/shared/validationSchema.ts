import { object, string } from 'yup';

export const validationSchemaCreate = object({
  name: string()
    .required('Tên bài viết không được để trống')
    .max(225, 'Chỉ được phép tối đa 255 kí tự'),
  // category_id: string().required('Danh mục không được để trống').nullable(),
  content: string().required('Nội dung bài viết không được để trống'),
});
