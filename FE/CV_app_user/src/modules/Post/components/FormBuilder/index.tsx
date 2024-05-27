import { Button } from '@mui/material';
import { FormikProps } from 'formik';
import cx from 'classnames';
import { useRouter } from 'next/router';

import { useGetCategoryOption } from '@/shared';
import { IPost } from '@/interfaces';
import { Form, TextInput, Select2, TagInput, FileUpload } from '@/shared/forms';
import { PostForm } from '../../models';
import styles from './styles.module.scss';
import dynamic from 'next/dynamic';
// import Editor from '@/components/common/Editor';
const Editor = dynamic(() => import('@/components/common/Editor'), { ssr: false });
interface IProps {
  rawState?: IPost;
  form: FormikProps<PostForm>;
}

const FormBuilder = ({ form, rawState }: IProps) => {
  const router = useRouter();
  const categories = useGetCategoryOption();
  return (
    <Form initForm={form} onSubmit={form.handleSubmit}>
      <TextInput
        required
        name="name"
        label="Tiêu đề bài viết"
        className={cx(
          styles.inputField,
          'tw-border tw-border-solid tw-border-gray-300 tw-rounded-[10px]'
        )}
      />

      <Select2
        name="category_id"
        label="Danh mục"
        options={categories}
        className={cx(
          styles.inputField,
          'tw-border tw-border-solid tw-border-gray-300 tw-rounded-[10px]'
        )}
      />

      <TagInput
        name="tags"
        label="Tags"
        placeholder="Nhập tag cho bài viết"
        className={cx(
          styles.inputField,
          'tw-border tw-border-solid tw-border-gray-300 tw-rounded-[10px]'
        )}
      />

      <Editor
        defaultValue={form.values.content}
        onChange={(value) => {
          form.setFieldValue('content', value);
        }}
      />

      <FileUpload
        uploadFolder="post"
        name="avatar"
        accept="image/*"
        placeholder="Chọn ảnh bài viết"
        className={styles.inputField}
      />

      <div className={styles.submitArea}>
        <Button
          className={styles.submitArea__button}
          type="submit"
          color="primary"
          variant="contained"
        >
          {rawState ? 'Cập nhật' : 'Đăng bài'}
        </Button>
        <Button
          type="button"
          onClick={() => router.back()}
          className={cx(styles.submitArea__button, styles.submitArea__back)}
          color="inherit"
          variant="contained"
        >
          Quay lại
        </Button>
      </div>
    </Form>
  );
};

export default FormBuilder;
